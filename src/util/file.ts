import { File } from "buffer";

export function downloadFile(
  data: Blob,
  fileName = "file",
  mime = "application/octet-stream"
) {
  const blob = new Blob([data], {
    type: mime,
  });
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", fileName);
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => {
    window.URL.revokeObjectURL(blobURL);
  }, 100);
}

export function getImportFile(accept = "*"): Promise<File> {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;
  return new Promise((resolve, reject) => {
    input.addEventListener("change", (ev) => {
      const file = (ev.target as unknown as { files: File[] })?.files[0];
      if (file) {
        resolve(file);
      } else {
        reject();
      }
    });
    input.addEventListener("error", reject);
    input.click();
  });
}
