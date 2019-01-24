workflow "New workflow" {
  on = "push"
  resolves = ["new-action"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  args = "install"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  needs = ["GitHub Action for npm"]
  args = "run build"
}

action "new-action" {
  uses = "owner/repo/path@ref"
  needs = ["GitHub Action for npm-1"]
}
