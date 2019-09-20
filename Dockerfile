FROM node:10-slim

LABEL com.github.actions.name="Enforce PR label"
LABEL com.github.actions.description="Enforce choosing label before merging PR"
LABEL com.github.actions.icon="code"
LABEL com.github.actions.color="blue"

LABEL maintainer="Yogev Ben David <yogev132@gmail.com>"

COPY lib /action/lib
ENTRYPOINT ["/action/lib/entrypoint.sh"]
