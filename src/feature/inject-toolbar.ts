export function useInjectToolbar(helper: BoardMixSdk): IFeature {
  helper.on("OPEN_API_EVENT_CALLBACK", async (data) => {
    if (data.type === "board") {
      // TODO
    } else {
      switch (data.key) {
        case "inject-tool-childA":
          alert("inject-tool-childA");
          break;
        case "inject-tool-childB":
          alert("inject-tool-childB");
          break;
        case "inject-tool-expand":
          alert("inject-tool-expand");
          break;
      }
    }
  });

  function open() {
    helper.sendMessage("OPEN_API_INJECT_UI", {
      toolbar: [
        {
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
          label: "展开菜单",
          action: "group",
          key: "inject-tool-group",
          children: [
            {
              icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzUpIj4KCQk8cGF0aCBpZD0iQSIgZD0iTTI4LjkxMjEgMzFMMjYuMTcwOSAzMUwyNC4yMDkgMjQuNzI0NkwxNi43MDMxIDI0LjcyNDZMMTQuNzEzOSAzMUwxMi4wODIgMzFMMTkuMDU0NyAxMC40Nzg1TDIxLjkzOTUgMTAuNDc4NUwyOC45MTIxIDMxWk0xOC4zNTc0IDE5LjUyMjVMMTcuMzQ1NyAyMi42NTMzTDIzLjU2NjQgMjIuNjUzM0wyMi41ODIgMTkuNTIyNUMyMS44MzAxIDE3LjE5ODIgMjEuMTgwNyAxNC45NTYxIDIwLjUxMDcgMTIuNTc3MUwyMC40MDE0IDEyLjU3NzFDMTkuNzU4OCAxNC45ODM0IDE5LjA4MiAxNy4xOTgyIDE4LjM1NzQgMTkuNTIyNVoiIGZpbGw9IiMwMDAwMDBGRiIvPgoJPC9nPgoJPGRlZnM+CgkJPGNsaXBQYXRoIGlkPSJjbGlwMjNfNSI+CgkJCTxyZWN0IGlkPSLnlLvmnb8gNyIgd2lkdGg9IjQwLjAwMDAwMCIgaGVpZ2h0PSI0MC4wMDAwMDAiIGZpbGw9IndoaXRlIi8+CgkJPC9jbGlwUGF0aD4KCTwvZGVmcz4KPC9zdmc+Cg==",
              label: "子菜单A",
              action: "expand",
              key: "inject-tool-childA",
            },
            {
              icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzcpIj4KCQk8cGF0aCBpZD0iQiIgZD0iTTIwLjM1MTYgMzFMMTMuODAyNyAzMUwxMy44MDI3IDEwLjQ3ODVMMTkuOTA3MiAxMC40Nzg1QzI0LjA3NzEgMTAuNDc4NSAyNi45NjE5IDExLjg3MyAyNi45NjE5IDE1LjQ4OTNDMjYuOTYxOSAxNy41MzMyIDI1Ljg2ODIgMTkuMzI0MiAyMy45MzM2IDE5LjkzOTVMMjMuOTMzNiAyMC4wODNDMjYuNDAxNCAyMC41NTQ3IDI4LjEzNzcgMjIuMTgxNiAyOC4xMzc3IDI0Ljk3NzVDMjguMTM3NyAyOS4wMTA3IDI0Ljk0NTMgMzEgMjAuMzUxNiAzMVpNMTYuNDA3MiAxMi41MjI1TDE2LjQwNzIgMTkuMjE0OEwxOS40NTYxIDE5LjIxNDhDMjIuOTgzNCAxOS4yMTQ4IDI0LjQxMjEgMTcuODk1NSAyNC40MTIxIDE1LjgyNDJDMjQuNDEyMSAxMy40MTggMjIuNzU3OCAxMi41MjI1IDE5LjU2NTQgMTIuNTIyNUwxNi40MDcyIDEyLjUyMjVaTTE2LjQwNzIgMjEuMTk3M0wxNi40MDcyIDI4LjkyODdMMTkuOTg5MyAyOC45Mjg3QzIzLjUxNjYgMjguOTI4NyAyNS41ODc5IDI3LjY3MDkgMjUuNTg3OSAyNC44OTU1QzI1LjU4NzkgMjIuMzQ1NyAyMy41NzEzIDIxLjE5NzMgMTkuOTg5MyAyMS4xOTczTDE2LjQwNzIgMjEuMTk3M1oiIGZpbGw9IiMwMDAwMDBGRiIvPgoJPC9nPgoJPGRlZnM+CgkJPGNsaXBQYXRoIGlkPSJjbGlwMjNfNyI+CgkJCTxyZWN0IGlkPSLnlLvmnb8gOCIgd2lkdGg9IjQwLjAwMDAwMCIgaGVpZ2h0PSI0MC4wMDAwMDAiIGZpbGw9IndoaXRlIi8+CgkJPC9jbGlwUGF0aD4KCTwvZGVmcz4KPC9zdmc+Cg==",
              label: "子菜单B",
              action: "event",
              key: "inject-tool-childB",
            },
          ],
        },
        {
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzkpIj4KCQk8cGF0aCBpZD0iRSIgZD0iTTI2Ljk1MDIgMzFMMTQuODAyNyAzMUwxNC44MDI3IDEwLjQ3ODVMMjYuNjQyNiAxMC40Nzg1TDI2LjY0MjYgMTIuNjU5MkwxNy40MDcyIDEyLjY1OTJMMTcuNDA3MiAxOS4wOTg2TDI1LjE4NjUgMTkuMDk4NkwyNS4xODY1IDIxLjMxMzVMMTcuNDA3MiAyMS4zMTM1TDE3LjQwNzIgMjguNzg1MkwyNi45NTAyIDI4Ljc4NTJMMjYuOTUwMiAzMVoiIGZpbGw9IiMwMDAwMDBGRiIvPgoJPC9nPgoJPGRlZnM+CgkJPGNsaXBQYXRoIGlkPSJjbGlwMjNfOSI+CgkJCTxyZWN0IGlkPSLnlLvmnb8gOSIgd2lkdGg9IjQwLjAwMDAwMCIgaGVpZ2h0PSI0MC4wMDAwMDAiIGZpbGw9IndoaXRlIi8+CgkJPC9jbGlwUGF0aD4KCTwvZGVmcz4KPC9zdmc+Cg==",
          label: "外部菜单",
          action: "expand",
          key: "inject-tool-expand",
        },
      ],
    });
  }

  function close() {
    helper.sendMessage("OPEN_API_INJECT_UI", {
      toolbar: [],
    });
  }

  return {
    open,
    close,
  };
}
