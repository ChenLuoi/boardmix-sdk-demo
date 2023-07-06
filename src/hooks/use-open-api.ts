let fileInput: HTMLInputElement;
function getImportFile(accept = "*"): Promise<File[]> {
    if (fileInput) {
        fileInput.remove();
    }
    return new Promise((resolve, reject) => {
        fileInput = document.createElement("input");
        fileInput.type = "file";
        document.body.appendChild(fileInput);

        fileInput.onchange = () => {
            const files = fileInput.files;
            files && resolve(Array.from(files));
        };
        fileInput.onabort = () => {
            reject();
        };
        fileInput.style.position = "absolute";
        fileInput.style.right = "200%";
        fileInput.style.margin = "0";
        fileInput.accept = accept;
        fileInput.multiple = true;
        fileInput.click();
    });
}

export const useOpenApi = (client: BoardMixSdk) => {
    const importData = async (position?: { x: number; y: number }) => {
        const images = await getImportFile("image/*");
        client.sendMessage("OPEN_API_CREATE", {
            strokeColor: "#00000000",
            strokeWidth: 0,
            fillColor: "#FFB4B4B4",
            contents: [
                {
                    type: "image",
                    width: 312,
                    height: 312,
                    left: 0,
                    top: 0,
                    imageData: images[0],
                },
                {
                    type: "rect",
                    width: 312,
                    height: 93,
                    left: 0,
                    top: 312,
                    strokeColor: "#00000000",
                    strokeWidth: 0,
                    fillColor: "#FFB4B4B4",
                },
                {
                    type: "text",
                    left: 0,
                    top: 38,
                    textInfo: [
                        {
                            textContent: "Style 3D",
                            textForeground: "#FF347CD4",
                            textBackground: "#FFC0E9FF",
                            "font-weight": "bold",
                        },
                    ],
                },
                {
                    type: "text",
                    width: 294,
                    left: 9,
                    top: 322,
                    textInfo: [
                        {
                            textContent: "Checkered boy shirt",
                            fontSize: 17,
                            "font-weight": "bold",
                            "line-height": 1.5,
                        },
                        {
                            textContent: "型号：MN01-W211027DYA7",
                            fontSize: 17,
                            "line-height": 1.5,
                        },
                        {
                            textContent: "品牌：STYLE3D",
                            fontSize: 17,
                            "line-height": 1.5,
                        },
                    ],
                },
            ],
            businessData: JSON.stringify({
                dataHash: "233aea333322",
                userId: 232332,
            }),
            position,
        });
    };

    const replaceImage = async (guid: string) => {
        const images = await getImportFile("image/*");
        client.sendMessage("OPEN_API_UPDATE", {
            changeType: "replaceImage",
            guid,
            imageData: images[0], //File
        });
    };

    const multipleImportData = async (position?: { x: number; y: number }) => {
        const images = await getImportFile("image/*");
        console.log("images", images);
        const datas: BaseOpenApiContainerInfo[] = images.map((image) => ({
            strokeColor: "#00000000",
            strokeWidth: 0,
            fillColor: "#FFB4B4B4",
            contents: [
                {
                    type: "image",
                    width: 312,
                    height: 312,
                    left: 0,
                    top: 0,
                    imageData: image,
                },
                {
                    type: "rect",
                    width: 312,
                    height: 93,
                    left: 0,
                    top: 312,
                    strokeColor: "#00000000",
                    strokeWidth: 0,
                    fillColor: "#FFB4B4B4",
                },
                {
                    type: "text",
                    left: 0,
                    top: 38,
                    textInfo: [
                        {
                            textContent: "Style 3D",
                            textForeground: "#FF347CD4",
                            textBackground: "#FFC0E9FF",
                            "font-weight": "bold",
                        },
                    ],
                },
                {
                    type: "text",
                    width: 294,
                    left: 9,
                    top: 322,
                    textInfo: [
                        {
                            textContent: "Checkered boy shirt",
                            fontSize: 17,
                            "font-weight": "bold",
                            "line-height": 1.5,
                        },
                        {
                            textContent: "型号：MN01-W211027DYA7",
                            fontSize: 17,
                            "line-height": 1.5,
                        },
                        {
                            textContent: "品牌：STYLE3D",
                            fontSize: 17,
                            "line-height": 1.5,
                        },
                    ],
                },
            ],
            businessData: JSON.stringify({
                dataHash: "233aea333322",
                userId: 232332,
            }),
        }));
        client.sendMessage("OPEN_API_CREATE", {
            type: "group",
            position,
            children: [
                {
                    type: "group",
                    children: datas,
                    attributes: {
                        columnNum: 6,
                        scaledWidth: 300,
                        horizontalGap: 15,
                        verticalGap: 15,
                        addFrame: true,
                        frameName: "class",
                        framePadding: {
                            left: 50,
                            top: 50,
                            right: 50,
                            bottom: 50,
                        },
                    },
                },
            ],
            attributes: {
                columnNum: 2,
                horizontalGap: 100,
                verticalGap: 100,
            },
        });
    };

    const classifyData = async (arr: string[]) => {
        client.sendMessage("OPEN_API_CLASSIFY", {
            type: "group",
            children: arr.map((i) => ({ type: "guid", guid: i })),
            attributes: {
                columnNum: 6,
                scaledWidth: 300,
                horizontalGap: 15,
                verticalGap: 15,
                addFrame: true,
                frameName: "class",
                framePadding: {
                    left: 50,
                    top: 50,
                    right: 50,
                    bottom: 50,
                },
            },
        });
    };

    const createText = () => {
        client.sendMessage("OPEN_API_CREATE_NATIVE_ELEMENT", {
            type: "text",
            width: 300,
            textInfo: [
                {
                    textContent: "Style 3D", // 文本内容
                    textForeground: "#FF347CD4", // 字体颜色
                    textBackground: "#FFC0E9FF", // 文本背景色
                    "font-weight": "bold", // 加粗
                },
                {
                    textContent: "Style 3D", // 文本内容
                    textForeground: "#FF347CD4", // 字体颜色
                    textBackground: "#FFC0E9FF", // 文本背景色
                    "font-weight": "bold", // 加粗
                },
                {
                    textContent: "Style 3D", // 文本内容
                    textForeground: "#FF347CD4", // 字体颜色
                    textBackground: "#FFC0E9FF", // 文本背景色
                    "font-weight": "bold", // 加粗
                },
            ],
        });
    };
    return {
        importData,
        multipleImportData,
        replaceImage,
        classifyData,
		createText
    };
};
