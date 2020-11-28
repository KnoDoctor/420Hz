import React from "react";

import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { convertStringToSlug } from "../../utilities/helperFunctions/helperFunctions";

//Import APIs
import { api } from "../../api/api";

export default function CmsBlock(props) {
    const {
        entityDetails,
        updatedEntity,
        cmsBlockType,
        cmsBlockTitle,
        fieldName,
        updateEntity,
        implicitUpdateEntity,
    } = props;

    const imageBlock = () => {
        let url = updatedEntity[fieldName];
        let isSaved = false;
        let containsFieldName = false;
        if (url != null) {
            if (url.indexOf("https://") > -1 || url.indexOf("http://") > -1) {
                if (url.indexOf("https://media.butterfield.com") > -1) {
                    isSaved = true;
                }
                if (url.indexOf(fieldName) > -1) {
                    containsFieldName = true;
                }
            } else {
                isSaved = true;
                containsFieldName = true;
            }
        } else {
            isSaved = true;
            containsFieldName = true;
        }
        const saveImage = () => {
            //Set Save Image POST Object
            const saveImageObject = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: {
                    fileName:
                        "website-image" +
                        "_" +
                        convertStringToSlug(entityDetails.pageType) +
                        "_" +
                        convertStringToSlug(entityDetails.pageName) +
                        "_" +
                        fieldName +
                        "_" +
                        entityDetails.pageId +
                        ".jpg",
                    url: updatedEntity[fieldName],
                },
            };

            api(
                "https://staging.api.butterfield.com/v1/photos/addPhoto",
                saveImageObject
            )
                .then((imageSaveResponse) => {
                    let path = imageSaveResponse.path;
                    let file = path.substring(path.lastIndexOf("/") + 1);
                    updateEntity(
                        fieldName,
                        "https://media.butterfield.com/" +
                            file +
                            "?" +
                            Date.now()
                    );
                })
                .catch(() => {
                    console.log("Login Expired");
                    localStorage.setItem("token", "expired");
                    window.location = "/login";
                });
        };

        return (
            <div>
                <h2>{cmsBlockTitle}</h2>
                <h4>{fieldName}</h4>
                <div style={{ maxWidth: 400 }}>
                    <img
                        style={{ width: "100%" }}
                        src={updatedEntity[fieldName]}
                        alt={cmsBlockTitle}
                    />
                </div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name={fieldName}
                    label={cmsBlockTitle}
                    type={cmsBlockTitle}
                    id={fieldName}
                    autoComplete="current-trip"
                    value={updatedEntity[fieldName]}
                    onChange={implicitUpdateEntity}
                />
                {/* {isSaved ? (
                    containsFieldName ? (
                        ""
                    ) : (
                        <>
                            <Alert severity="warning">
                                Image has been saved to media server but not for
                                this field, please create an updated link.
                            </Alert>
                            <Button
                                style={{ marginTop: 10 }}
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    saveImage();
                                }}
                            >
                                Updated Link
                            </Button>
                        </>
                    )
                ) : (
                    <>
                        <Alert severity="warning">
                            Image not saved to media server, please upload
                            before saving.
                        </Alert>
                        <Button
                            style={{ marginTop: 10 }}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                saveImage();
                            }}
                        >
                            Upload Image
                        </Button>
                    </>
                )} */}
            </div>
        );
    };

    const textBlock = () => {
        return (
            <div>
                <h2>{cmsBlockTitle}</h2>
                <h4>{fieldName}</h4>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    name={fieldName}
                    label={cmsBlockTitle}
                    type={cmsBlockTitle}
                    id={fieldName}
                    autoComplete="current-trip"
                    value={updatedEntity[fieldName]}
                    onChange={implicitUpdateEntity}
                />
            </div>
        );
    };

    const wysiwygBlock = () => {
        return (
            <div>
                <h2>{cmsBlockTitle}</h2>
                <h4>{fieldName}</h4>
                <ReactQuill
                    theme="snow"
                    value={updatedEntity[fieldName] || ""}
                    onChange={(content) => {
                        updateEntity(fieldName, content);
                    }}
                    id={fieldName}
                />
            </div>
        );
    };

    const monthCheckboxesBlock = () => {
        let array = updatedEntity[fieldName]
            ? updatedEntity[fieldName]
            : [
                  { name: "Jan", ideal: false },
                  { name: "Feb", ideal: false },
                  { name: "Mar", ideal: false },
                  { name: "Apr", ideal: false },
                  { name: "May", ideal: false },
                  { name: "Jun", ideal: false },
                  { name: "Jul", ideal: false },
                  { name: "Aug", ideal: false },
                  { name: "Sep", ideal: false },
                  { name: "Oct", ideal: false },
                  { name: "Nov", ideal: false },
                  { name: "Dec", ideal: false },
              ];

        return (
            <div>
                <h2>{cmsBlockTitle}</h2>
                <h4>{fieldName}</h4>
                <FormGroup row>
                    {array.map((month) => {
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={month.ideal}
                                        name={month.name}
                                        onChange={() => {
                                            let index = array.findIndex(
                                                (obj) => obj.name === month.name
                                            );
                                            array[index].ideal = !array[index]
                                                .ideal;
                                            updateEntity(fieldName, array);
                                        }}
                                    />
                                }
                                label={month.name}
                            />
                        );
                    })}
                </FormGroup>
            </div>
        );
    };

    //RENDER
    return (
        <div>
            {cmsBlockType == "Image" ? imageBlock() : ""}
            {cmsBlockType == "Text" ? textBlock() : ""}
            {cmsBlockType == "WYSIWYG" ? wysiwygBlock() : ""}
            {cmsBlockType == "Month Checkboxes" ? monthCheckboxesBlock() : ""}
        </div>
    );
}
