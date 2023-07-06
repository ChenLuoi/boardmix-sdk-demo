export function useInjectIcon(helper: BoardMixSdk): IFeature {
    function open() {
        helper.sendMessage("OPEN_API_INJECT_UI", {
            icon: {
                headerBack:
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzExKSI+CgkJPHBhdGggaWQ9Iui/lCIgZD0iTTI0LjU1ODYgMjIuMTU0M0MyNS42ODk1IDIwLjg4MjggMjYuNjUwNCAxOS4zNjUyIDI3LjI3MTUgMTcuNjY2TDE5LjAxNTYgMTcuNjY2QzE4Ljk0NTMgMjAuODA2NiAxOC40NDE0IDI0LjgxNDUgMTYuMTg1NSAyNy41OTc3QzE1Ljg2OTEgMjcuMjg3MSAxNS4xMDE2IDI2Ljc4MzIgMTQuNjk3MyAyNi41ODk4QzE3IDIzLjc4MzIgMTcuMjYzNyAxOS44MjIzIDE3LjI2MzcgMTYuODk4NEwxNy4yNjM3IDExLjY4OTVDMjEuMjk0OSAxMS40OTYxIDI2LjA5MzggMTEuMDM5MSAyOC43MzYzIDEwLjMxODRMMzAuMjAxMiAxMS43MzYzQzI3LjI3MTUgMTIuNTI3MyAyMi45MDYyIDEyLjk4NDQgMTkuMDE1NiAxMy4xNzc3TDE5LjAxNTYgMTYuMDU0N0wyOC4wMTU2IDE2LjA1NDdMMjguMzQ5NiAxNS45ODQ0TDI5LjQzMzYgMTYuMzk0NUMyOC42ODk1IDE5LjEzMDkgMjcuNDQxNCAyMS40MTAyIDI1Ljg1MzUgMjMuMjU1OUMyNy4zNjUyIDI0LjUyNzMgMjguNzU5OCAyNS43NTIgMjkuNjk3MyAyNi43MTI5TDI4LjMyNjIgMjcuOTYwOUMyNy40NjQ4IDI3IDI2LjE0NjUgMjUuNzc1NCAyNC42ODE2IDI0LjQ4MDVDMjMuMDcwMyAyNi4wMTU2IDIxLjE1NDMgMjcuMTkzNCAxOS4xNjIxIDI4LjAwNzhDMTguOTQ1MyAyNy41NTA4IDE4LjUxMTcgMjYuOTA2MiAxOC4xNTQzIDI2LjU0M0MyMC4wMjM0IDI1Ljg5ODQgMjEuODQ1NyAyNC44MTQ1IDIzLjQxMDIgMjMuMzQ5NkMyMi4wODU5IDIyLjI0OCAyMC43Njc2IDIxLjExNzIgMTkuNTY2NCAyMC4xODU1TDIwLjc5MSAxOS4xNTQzQzIxLjk0NTMgMjAuMDM5MSAyMy4yNjM3IDIxLjA5MzggMjQuNTU4NiAyMi4xNTQzWk0xMS4yODcxIDEwLjc5ODhDMTIuMzk0NSAxMS45Mjk3IDEzLjkwNjIgMTMuNTU4NiAxNC42NTA0IDE0LjUxOTVMMTMuMTYyMSAxNS41NzQyQzEyLjQ2NDggMTQuNTg5OCAxMSAxMi44OTA2IDkuODY5MTQgMTEuNjg5NUwxMS4yODcxIDEwLjc5ODhaTTkuMjQ4MDUgMTguODE0NUwxNC4wMjM0IDE4LjgxNDVMMTQuMDIzNCAyNy40ODA1QzE0LjQ4MDUgMjcuNzQ0MSAxNC45ODQ0IDI4LjEwMTYgMTUuNzUyIDI4LjUxMTdDMTcuMzEwNSAyOS4zNDk2IDE5LjQ0OTIgMjkuNDk2MSAyMi4wNjI1IDI5LjQ5NjFDMjQuODk4NCAyOS40OTYxIDI4LjU2NjQgMjkuMzI2MiAzMC45OTIyIDI5LjAzOTFDMzAuNzc1NCAyOS41MTk1IDMwLjQ4ODMgMzAuMzg2NyAzMC40NDE0IDMwLjkxNDFDMjguNjQyNiAzMS4wMzEyIDI0LjQxOCAzMS4xNzc3IDIyLjAxNTYgMzEuMTc3N0MxOS4xNjIxIDMxLjE3NzcgMTcuMDcwMyAzMC45MTQxIDE1LjM2NTIgMzAuMDIzNEMxNC4zMTA1IDI5LjQ0OTIgMTMuNTQzIDI4Ljc1MiAxMi45OTIyIDI4Ljc1MkMxMi4yMjQ2IDI4Ljc1MiAxMS4xNDY1IDMwLjA3MDMgMTAuMDYyNSAzMS40NDE0TDguODkwNjIgMjkuODA2NkMxMC4wODU5IDI4LjU4MiAxMS4yNjM3IDI3LjY1MDQgMTIuMjcxNSAyNy4zMTA1TDEyLjI3MTUgMjAuNTE5NUw5LjI0ODA1IDIwLjUxOTVMOS4yNDgwNSAxOC44MTQ1WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xMSI+CgkJCTxyZWN0IGlkPSLnlLvmnb8gMTAiIHdpZHRoPSI0MC4wMDAwMDAiIGhlaWdodD0iNDAuMDAwMDAwIiBmaWxsPSJ3aGl0ZSIvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cjwvc3ZnPgo=",
            },
        });
    }

    function close() {
        helper.sendMessage("OPEN_API_INJECT_UI", {
            icon: {},
        });
    }

    return {
        open,
        close,
    };
}