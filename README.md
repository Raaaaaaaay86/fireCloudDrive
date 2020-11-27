# Firebase Cloud Drive by Nuxt.js
  
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Tools 使用工具: 
  - Firebase: Database、Authentication、Storage。
  - Nuxt.js
  - Express.js (in Nuxt ServerMiddleware)
  - TailwindCSS
  
## Firebase Database Structure 架構:

```
|-- root (根目錄)
|   |-- File (檔案)
|   |-- File (檔案)
|   |-- File (檔案)
|   |-- Foo (Folder) (資料夾)
|   |-- size: ...<Number> (Root 已使用空間)
|
|-- root-Foo
|   |-- File (檔案)
|   |-- ...Files
|   |-- size: ...<Number> (Foo 已使用空間)
|
|-- usedStorage: ...<Number> (root + Foo 已使用空間)
```
[Firebase Database Structure Image 架構範例圖](https://firebasestorage.googleapis.com/v0/b/clouddrive-3cbb9.appspot.com/o/file_system_structure.png?alt=media&token=1fa6235e-ed3e-4b34-a23f-288171efd608) 

## Features 功能介紹
  - Upload files. 上傳檔案。
  - Create folder. 新增資料夾。
  - Allow to upload files in created folder. 可在資料夾中上傳檔案。
  - Allow to archive files and tagged by star icon. 可收藏檔案並以星號標記。
  - Displaying used Storage .空間用量顯示。
  - Sorting by file name, file size, upload time, author name. 排序 (檔名、大小、作者名、上傳時間)。
  - Searching by String. 字串搜尋。
  
## Test Account and Password 測試帳號與密碼
  Email: test@mail.com
  Password: test123
