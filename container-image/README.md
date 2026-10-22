# @swamp/container-image

Build, run, push, and export container images via Docker, Podman, or Apple
Containers. Select your runtime once in `globalArguments.binary` and every
method invokes the right CLI transparently. Each method writes a typed
resource so workflows can chain them via CEL.

## Installation

```bash
swamp extension pull @swamp/container-image
```

## Quick Start

```bash
swamp model create @swamp/container-image myapp
swamp model edit myapp   # set binary if not docker

# Build
swamp model method run myapp build \
  --input tag=myapp:latest --json

# Run
swamp model method run myapp run \
  --input image=myapp:latest --json

# Login, push
swamp model method run myapp login \
  --input username=user \
  --input password='${{ vault.get("registry", "token") }}' --json

swamp model method run myapp push \
  --input image=registry.example.com/myapp:latest --json
```

## Configuration

```yaml
globalArguments:
  name: myapp
  binary: docker   # "docker" (default), "podman", or "container"
```

| Binary      | Runtime           | Notes |
| ----------- | ----------------- | ----- |
| `docker`    | Docker Engine     | Default. Requires Docker Desktop or Docker CE. |
| `podman`    | Podman            | On macOS, runs via `podman machine`. |
| `container` | Apple Containers  | macOS only (arm64). |

## Runtime Support Matrix

| Method                 | Docker                | Podman                           | Apple Containers           |
| ---------------------- | --------------------- | -------------------------------- | -------------------------- |
| `build`                | `docker build`        | `podman build`                   | `container build`          |
| `run`                  | `docker run --rm`     | `podman run --rm`                | `container run --rm`       |
| `login`                | `docker login`        | `podman login`                   | `container registry login` |
| `push`                 | `docker push`         | `podman push`                    | `container image push`     |
| `multi-platform-build` | `docker buildx build` | `podman build --platform` + push | `container build --platform` + `container image push` |

Apple Containers builds non-host and multi-platform images with
`--platform` (Rosetta for `linux/amd64` on Apple Silicon). This needs
`container` 1.5.0 or later; older releases pass the pre-flight check but
fail at build time.

## Methods

### `build`

Build a container image from a Dockerfile. Optionally export the built
image as an OCI or Docker archive.

| Argument       | Type                  | Required | Description |
| -------------- | --------------------- | -------- | ----------- |
| `context`      | string                | No       | Build context path (default: `.`) |
| `dockerfile`   | string                | No       | Path to Dockerfile |
| `tag`          | string                | No       | Image tag (required if exporting) |
| `target`       | string                | No       | Multi-stage build target |
| `buildArgs`    | Record<string,string> | No       | Build arguments (`--build-arg`) |
| `labels`       | Record<string,string> | No       | Image labels (`--label`) |
| `noCache`      | boolean               | No       | Disable build cache (default: `false`) |
| `platform`     | string                | No       | Target platform, e.g. `linux/amd64` (default: host platform) |
| `exportFormat` | `"oci"` \| `"docker"` | No       | Export the image as a tar archive |
| `exportPath`   | string                | No       | Destination path for the archive |

**Examples:**

```bash
# Simple build
swamp model method run myapp build \
  --input tag=myapp:latest --json

# Build with custom Dockerfile and build args
swamp model method run myapp build \
  --input tag=myapp:prod \
  --input dockerfile=Dockerfile.prod \
  --input target=release \
  --input buildArgs='{"NODE_ENV":"production"}' --json

# Build a linux/amd64 image on an Apple Silicon host
swamp model method run myapp build \
  --input tag=myapp:amd64 \
  --input platform=linux/amd64 --json

# Build and export as OCI archive
swamp model method run myapp build \
  --input tag=myapp:latest \
  --input exportFormat=oci \
  --input exportPath=./myapp-oci.tar --json

# Build and export as Docker archive
swamp model method run myapp build \
  --input tag=myapp:latest \
  --input exportFormat=docker \
  --input exportPath=./myapp-docker.tar --json
```

#### Image Export

When `exportFormat` and `exportPath` are set, the build method stores the
image in the local image store first, then exports it as a tar archive.
The implementation varies by runtime but the result is the same format:

| Export Format | Docker                     | Podman                          | Apple Containers        |
| ------------- | -------------------------- | ------------------------------- | ----------------------- |
| `oci`         | `buildx build --output`    | `podman save --format oci-archive` | `container image save` |
| `docker`      | `docker save`              | `podman save --format docker-archive` | Not supported     |

Apple Containers only supports OCI export (OCI is its native format).
Requesting `exportFormat: "docker"` with `binary: "container"` fails with
a clear error.

### `run`

Run a container with `--rm`. Captures stdout and stderr into the resource.

| Argument     | Type                  | Required | Description |
| ------------ | --------------------- | -------- | ----------- |
| `image`      | string                | Yes      | Image to run |
| `command`    | string[]              | No       | Command and arguments |
| `env`        | Record<string,string> | No       | Environment variables (`-e`) |
| `volumes`    | string[]              | No       | Volume mounts (`-v host:container`) |
| `ports`      | string[]              | No       | Port mappings (`-p host:container`) |
| `network`    | string                | No       | Network name (`--network`) |
| `entrypoint` | string                | No       | Override entrypoint (`--entrypoint`) |
| `privileged` | boolean               | No       | Run in privileged mode (`--privileged`, default: `false`) |
| `extraArgs`  | string[]              | No       | Additional run flags passed before the image argument |

**Examples:**

```bash
# Simple run
swamp model method run myapp run \
  --input image=alpine:latest \
  --input command='["echo","hello"]' --json

# Run with env vars and volumes
swamp model method run myapp run \
  --input image=myapp:latest \
  --input env='{"DATABASE_URL":"postgres://localhost/db"}' \
  --input volumes='["/data:/app/data"]' \
  --input ports='["8080:80"]' --json

# Run in privileged mode (e.g. for losetup/mount)
swamp model method run myapp run \
  --input image=builder:latest \
  --input privileged=true \
  --input command='["bash","-c","losetup /dev/loop0 disk.img && mount /dev/loop0 /mnt"]' --json

# Run with extra flags
swamp model method run myapp run \
  --input image=alpine:latest \
  --input extraArgs='["--cap-add","SYS_ADMIN","--device","/dev/loop0"]' --json
```

### `login`

Log into a container registry. The password is piped via `--password-stdin`
and never appears in argv, resources, or logs.

| Argument   | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| `server`   | string | No       | Registry server (default: Docker Hub) |
| `username` | string | Yes      | Registry username |
| `password` | string | Yes      | Password (sensitive) |

Supply the password via a vault reference or environment variable so it
never appears in plaintext in your model definition:

```bash
# From a swamp vault
swamp model method run myapp login \
  --input server=ghcr.io \
  --input username=myorg \
  --input password='${{ vault.get("registry", "ghcr-token") }}' --json

# From an environment variable
swamp model method run myapp login \
  --input server=ghcr.io \
  --input username=myorg \
  --input password='${{ env.REGISTRY_PASSWORD }}' --json
```

The `password` field is annotated with `sensitive: true`, which means
swamp automatically redacts it in logs, reports, and stored data
regardless of how the value was supplied.

Each runtime routes through its own login subcommand:

- Docker: `docker login --password-stdin`
- Podman: `podman login --password-stdin`
- Apple Containers: `container registry login --password-stdin`

### `push`

Push a locally-built image to a registry. Captures the pushed digest.

| Argument | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| `image`  | string | Yes      | Image reference (e.g. `registry.example.com/app:v1`) |

**Examples:**

```bash
# Tag and push
docker tag myapp:latest ghcr.io/myorg/myapp:v1
swamp model method run myapp push \
  --input image=ghcr.io/myorg/myapp:v1 --json
```

Each runtime routes through its own push subcommand:

- Docker: `docker push`
- Podman: `podman push`
- Apple Containers: `container image push`

### `multi-platform-build`

Build for multiple platforms in a single pass, with optional push.
All three runtimes are supported.

| Argument     | Type                  | Required | Description |
| ------------ | --------------------- | -------- | ----------- |
| `context`    | string                | No       | Build context path (default: `.`) |
| `dockerfile` | string                | No       | Path to Dockerfile |
| `platforms`  | string[]              | Yes      | Target platforms |
| `tags`       | string[]              | Yes      | Image tags |
| `push`       | boolean               | No       | Push after build (default: `true`) |
| `buildArgs`  | Record<string,string> | No       | Build arguments |
| `labels`     | Record<string,string> | No       | Image labels |
| `cacheFrom`  | string[]              | No       | Cache sources (`--cache-from`) |
| `cacheTo`    | string[]              | No       | Cache destinations (`--cache-to`) |

The implementation differs by runtime:

- **Docker**: `docker buildx build --platform linux/amd64,linux/arm64 --push`
- **Podman**: `podman build --platform linux/amd64,linux/arm64 --manifest <tag>`,
  then `podman manifest push <tag>` if `push: true`
- **Apple Containers**: `container build --platform linux/amd64 --platform linux/arm64 -t <tag>`,
  then `container image push <tag>` for each tag if `push: true`.
  `cacheFrom` and `cacheTo` are rejected — `container build` has no cache
  import/export flags. Requires `container` 1.5.0 or later.

**Examples:**

```bash
# Build for amd64 + arm64 and push
swamp model method run myapp multi-platform-build \
  --input platforms='["linux/amd64","linux/arm64"]' \
  --input tags='["ghcr.io/myorg/myapp:latest"]' \
  --input push=true --json

# Build without pushing (local verification)
swamp model method run myapp multi-platform-build \
  --input platforms='["linux/amd64","linux/arm64"]' \
  --input tags='["myapp:multiarch"]' \
  --input push=false --json
```

## Workflow Examples

### Build, test, push

```yaml
steps:
  - model: myapp
    method: build
    input:
      tag: myapp:${{ git.sha }}
      context: .

  - model: myapp
    method: run
    input:
      image: myapp:${{ git.sha }}
      command: ["npm", "test"]

  - model: myapp
    method: login
    input:
      server: ghcr.io
      username: myorg
      password: ${{ vault.get("registry", "ghcr-token") }}

  - model: myapp
    method: push
    input:
      image: ghcr.io/myorg/myapp:${{ git.sha }}
```

### Build, test, push (with env var credentials)

```yaml
steps:
  - model: myapp
    method: build
    input:
      tag: myapp:${{ git.sha }}
      context: .

  - model: myapp
    method: run
    input:
      image: myapp:${{ git.sha }}
      command: ["npm", "test"]

  - model: myapp
    method: login
    input:
      server: ghcr.io
      username: ${{ env.REGISTRY_USERNAME }}
      password: ${{ env.REGISTRY_PASSWORD }}

  - model: myapp
    method: push
    input:
      image: ghcr.io/myorg/myapp:${{ git.sha }}
```

### Build and export as OCI archive

```yaml
steps:
  - model: myapp
    method: build
    input:
      tag: myapp:release
      exportFormat: oci
      exportPath: ./artifacts/myapp.tar
```

### Multi-platform build and push

```yaml
steps:
  - model: myapp
    method: login
    input:
      server: ghcr.io
      username: myorg
      password: ${{ vault.get("registry", "ghcr-token") }}

  - model: myapp
    method: multi-platform-build
    input:
      platforms: ["linux/amd64", "linux/arm64"]
      tags: ["ghcr.io/myorg/myapp:latest", "ghcr.io/myorg/myapp:v1.2.3"]
      push: true
      cacheFrom: ["type=registry,ref=ghcr.io/myorg/myapp:cache"]
      cacheTo: ["type=inline"]
```

## Resources

Each method writes a named resource for workflow chaining via CEL:

| Resource Name                    | Spec                       | Key Fields |
| -------------------------------- | -------------------------- | ---------- |
| `build-<name>`                   | `buildResult`              | tag, exitCode, stdout, stderr, exportFormat, exportPath |
| `run-<name>`                     | `runResult`                | image, command, exitCode, stdout, stderr |
| `login-<name>`                   | `loginResult`              | server, username, exitCode |
| `push-<name>`                    | `pushResult`               | image, digest, exitCode, stdout, stderr |
| `multi-platform-build-<name>`    | `multiPlatformBuildResult` | platforms, tags, digest, exitCode, push |

## Security

- **Password redaction**: The `login` password field uses
  `z.meta({ sensitive: true })`, so swamp automatically redacts it in
  logs, reports, and stored data. It is piped via `--password-stdin` and
  never appears in process argv.
- **Input validation**: All user-controlled strings are guarded against
  newline and NUL byte injection at schema validation time, preventing
  CLI flag smuggling through option values.
- **Binary enum**: The `binary` field is a strict enum (`docker`, `podman`,
  `container`), preventing arbitrary command execution.

## Requirements

- One of: Docker (with BuildKit), Podman, or Apple Containers CLI.
- Docker Buildx plugin for `multi-platform-build` when using Docker
  (Podman has native multi-platform support).
- No other external dependencies.
