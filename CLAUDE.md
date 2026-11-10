# claude-marketplace — CLAUDE.md

**This project is built by `jetagents`.** Its content (the skills of the
`jetcost` plugin and the plugin version) is written by `node skills/build.js`
in `../jetagents`, which is where the skills live and are maintained. Work on
them there, not here.

The Claude plugin marketplace of the DAE team, synced to GitHub by the
pipeline. One plugin, `jetcost` (`plugins/jetcost/`).

## Decisions to keep

**`plugins/jetcost/skills/` is generated: never edit it here.** The skills
live in `../jetagents/skills/`, where the semantic-checker audits them, and
`node skills/build.js` (run from `jetagents`) rewrites this folder whole and
bumps the patch version in `plugins/jetcost/.claude-plugin/plugin.json`.
A hand edit here is overwritten by the next build, and the build refuses to
run while this folder has uncommitted changes. To change a skill, change it
in `jetagents` and rebuild with `node skills/build.js --commit --push`
(or without the flags, then commit here by hand). Decided 2026-11-10; the full reason
is in `jetagents/CLAUDE.md` (section "`skills/` vs `domain/`").

The version bump matters: Claude Code updates an installed plugin only when
its version changes, so do not commit regenerated skills without it.
