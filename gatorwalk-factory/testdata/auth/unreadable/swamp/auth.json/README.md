# Not a file

`auth.json` here is a directory, so reading it fails with an error that is not
"not found". The swamp-club adapter's tests use it to check that a stored login
it cannot read is an auth error, never taken as "not logged in".
