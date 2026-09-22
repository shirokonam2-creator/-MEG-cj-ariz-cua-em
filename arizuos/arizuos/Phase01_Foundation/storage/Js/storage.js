/* =========================================
   ARIZUOS STORAGE
   ========================================= */


/* STORAGE CONFIG */

const TOTAL_STORAGE = 32 * 1024 * 1024 * 1024;


/* ELEMENTS */

const fileList = document.getElementById("fileList");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const usedText = document.getElementById("usedText");

const totalText = document.getElementById("totalText");

const percentText = document.getElementById("percentText");

const progressBar = document.getElementById("progressBar");

const fileInput = document.getElementById("fileInput");

const addFileBtn = document.getElementById("addFileBtn");

const refreshBtn = document.getElementById("refreshBtn");

const clearBtn = document.getElementById("clearBtn");

const newFolderBtn = document.getElementById("newFolderBtn");

const folderModal = document.getElementById("folderModal");

const folderName = document.getElementById("folderName");

const cancelFolder = document.getElementById("cancelFolder");

const createFolder = document.getElementById("createFolder");

const backBtn = document.getElementById("backBtn");


/* DATA */

let files = JSON.parse(
    localStorage.getItem("arizuOS_files")
) || [];


/* =========================================
   FORMAT FILE SIZE
   ========================================= */

function formatSize(bytes) {

    if (bytes === 0) {
        return "0 B";
    }

    const units = [
        "B",
        "KB",
        "MB",
        "GB",
        "TB"
    ];

    const i = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    const size =
        bytes /
        Math.pow(1024, i);

    return (
        size.toFixed(
            size >= 10 || i === 0
                ? 0
                : 1
        )
        + " "
        + units[i]
    );
}


/* =========================================
   GET ICON
   ========================================= */

function getFileIcon(file) {

    if (file.type === "folder") {
        return "📁";
    }

    const name =
        file.name.toLowerCase();

    if (
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png") ||
        name.endsWith(".gif") ||
        name.endsWith(".webp")
    ) {
        return "🖼️";
    }

    if (
        name.endsWith(".mp3") ||
        name.endsWith(".wav") ||
        name.endsWith(".ogg")
    ) {
        return "🎵";
    }

    if (
        name.endsWith(".mp4") ||
        name.endsWith(".mkv") ||
        name.endsWith(".webm")
    ) {
        return "🎬";
    }

    if (
        name.endsWith(".zip") ||
        name.endsWith(".rar") ||
        name.endsWith(".7z")
    ) {
        return "📦";
    }

    if (
        name.endsWith(".html") ||
        name.endsWith(".css") ||
        name.endsWith(".js") ||
        name.endsWith(".kt") ||
        name.endsWith(".java") ||
        name.endsWith(".py")
    ) {
        return "💻";
    }

    if (
        name.endsWith(".txt") ||
        name.endsWith(".md")
    ) {
        return "📄";
    }

    return "📄";
}


/* =========================================
   SAVE
   ========================================= */

function saveFiles() {

    localStorage.setItem(
        "arizuOS_files",
        JSON.stringify(files)
    );
}


/* =========================================
   RENDER
   ========================================= */

function renderFiles() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    fileList.innerHTML = "";


    const filtered =
        files.filter(file =>
            file.name
                .toLowerCase()
                .includes(search)
        );


    if (filtered.length === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";
    }


    filtered.forEach(file => {

        const item =
            document.createElement("div");

        item.className =
            "file-item";


        const icon =
            document.createElement("div");

        icon.className =
            "file-icon";

        icon.textContent =
            getFileIcon(file);


        const info =
            document.createElement("div");

        info.className =
            "file-info";


        const name =
            document.createElement("div");

        name.className =
            "file-name";

        name.textContent =
            file.name;


        const size =
            document.createElement("div");

        size.className =
            "file-size";

        if (file.type === "folder") {

            size.textContent =
                "Thư mục";

        } else {

            size.textContent =
                formatSize(file.size);
        }


        info.appendChild(name);
        info.appendChild(size);


        const deleteBtn =
            document.createElement("button");

        deleteBtn.className =
            "file-delete";

        deleteBtn.textContent =
            "🗑️";


        deleteBtn.addEventListener(
            "click",
            () => deleteFile(file.id)
        );


        item.appendChild(icon);
        item.appendChild(info);
        item.appendChild(deleteBtn);

        fileList.appendChild(item);

    });


    updateStorage();
}


/* =========================================
   STORAGE INFO
   ========================================= */

function updateStorage() {

    let used = 0;

    files.forEach(file => {

        if (file.type !== "folder") {
            used += file.size || 0;
        }

    });


    const percent =
        Math.min(
            (used / TOTAL_STORAGE) * 100,
            100
        );


    usedText.textContent =
        formatSize(used);

    totalText.textContent =
        "32 GB";

    percentText.textContent =
        percent.toFixed(1)
        + "% đã sử dụng";

    progressBar.style.width =
        percent + "%";
}


/* =========================================
   DELETE FILE
   ========================================= */

function deleteFile(id) {

    const confirmed =
        confirm(
            "Bạn có chắc muốn xóa tệp này?"
        );

    if (!confirmed) {
        return;
    }


    files =
        files.filter(
            file => file.id !== id
        );


    saveFiles();

    renderFiles();
}


/* =========================================
   ADD REAL FILE
   ========================================= */

addFileBtn.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


fileInput.addEventListener(
    "change",
    event => {

        const selectedFiles =
            Array.from(
                event.target.files
            );


        selectedFiles.forEach(file => {

            files.push({

                id:
                    Date.now()
                    + "-"
                    + Math.random()
                        .toString(36)
                        .substring(2),

                name:
                    file.name,

                size:
                    file.size,

                type:
                    "file",

                createdAt:
                    new Date().toISOString()

            });

        });


        saveFiles();

        renderFiles();


        fileInput.value = "";

    }
);


/* =========================================
   CREATE FOLDER
   ========================================= */

newFolderBtn.addEventListener(
    "click",
    () => {

        folderModal.classList.remove(
            "hidden"
        );

        folderName.value = "";

        folderName.focus();

    }
);


/* CANCEL */

cancelFolder.addEventListener(
    "click",
    () => {

        folderModal.classList.add(
            "hidden"
        );

    }
);


/* CREATE */

createFolder.addEventListener(
    "click",
    createNewFolder
);


folderName.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            createNewFolder();
        }

    }
);


function createNewFolder() {

    const name =
        folderName.value.trim();


    if (!name) {

        alert(
            "Vui lòng nhập tên thư mục."
        );

        return;
    }


    files.push({

        id:
            Date.now()
            + "-"
            + Math.random()
                .toString(36)
                .substring(2),

        name:
            name,

        size:
            0,

        type:
            "folder",

        createdAt:
            new Date().toISOString()

    });


    saveFiles();

    renderFiles();


    folderModal.classList.add(
        "hidden"
    );
}


/* =========================================
   SEARCH
   ========================================= */

searchInput.addEventListener(
    "input",
    renderFiles
);


/* =========================================
   REFRESH
   ========================================= */

refreshBtn.addEventListener(
    "click",
    () => {

        renderFiles();

    }
);


/* =========================================
   CLEAR ALL
   ========================================= */

clearBtn.addEventListener(
    "click",
    () => {

        if (files.length === 0) {

            alert(
                "Không có tệp để xóa."
            );

            return;
        }


        const confirmed =
            confirm(
                "Xóa toàn bộ tệp trong Storage?"
            );


        if (!confirmed) {
            return;
        }


        files = [];

        saveFiles();

        renderFiles();

    }
);


/* =========================================
   BACK BUTTON
   ========================================= */

backBtn.addEventListener(
    "click",
    () => {

        if (history.length > 1) {

            history.back();

        } else {

            alert(
                "Đây là trang Storage của ArizuOS."
            );

        }

    }
);


/* =========================================
   START
   ========================================= */

renderFiles();