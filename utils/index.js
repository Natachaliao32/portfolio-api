var { existsSync, mkdirSync } = require("fs");
var { Project } = require("./../models/Project.js");

const changeName = (name, names, index) => {
    let newName = `${name}_${index}`;

    if (!names.includes(newName)) {
      return newName;
    }
    return changeName(name, names, index + 1);
}

const uploadFiles = async (projectId, files) => {

    // Create directory if does not exist
    const dir = './assets/' + projectId;
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    if (files) {

        // Format if files not array
        if (!Array.isArray(files)) files = [files];

        let uploadedFiles = [];
        let alreadyUploaded = [];

        // Get already uploaded files if project already exists
        let project;
        try {
            project = await Project.findById(projectId);
        } catch (error) {
            throw error
        }
        if(project) alreadyUploaded = project.files.filter(file => !file.external).map(file => file.path);

        files.forEach(file => {
            
            // If file with same path already exists, change name of file
            if(alreadyUploaded.includes(`${projectId}/${file.name}`)) {
                let allNames = alreadyUploaded.map(path => path.split('/')[1].split('.')[0]);
                const nameArray = file.name.split('.');
                file.name = `${changeName(nameArray[0], allNames, 1)}.${nameArray[1]}`;
            }
            
            // Move files to directory
            let path = dir + "/" + file.name;
            file.mv(path, err => {
                if (err) return err;
            })
            const newProjectFile = { path: `${projectId}/${file.name}`, media: file.mimetype.split('/')[0], external: false };
            uploadedFiles.push(newProjectFile);

            // console.log("alreadyUploaded: ", alreadyUploaded);
            // console.log("newProjectFile: ", newProjectFile);

            alreadyUploaded.push(newProjectFile.path);
        }); 
        console.log("uploadedFiles: ", uploadedFiles);
        return uploadedFiles;
    }
}

module.exports = { uploadFiles, changeName }