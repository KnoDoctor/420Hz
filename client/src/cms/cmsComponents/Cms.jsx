import React, { useReducer, useState } from "react";

import CmsBlock from "./CmsBlock";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import { api } from "../../api/api";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    root: {
        width: "100%",
        maxWidth: 1080,
        margin: "auto",
        textAlign: "left",
    },
    container: {
        marginTop: "75px",
    },
});

export default function Cms(props) {
    const { cmsObject, entityData, cmsData } = props;

    const classes = useStyles();

    const [updatedEntity, setUpdatedEntity] = useState(
        cmsData ? cmsData : entityData
    );
    const [alert, setAlert] = useState(false);
    const [saving, setSaving] = useState(false);

    const implicitUpdateEntity = (e) => {
        setUpdatedEntity({
            ...updatedEntity,
            [e.target.name]: e.target.value,
        });
    };

    const updateEntity = (fieldName, content) => {
        setUpdatedEntity({
            ...updatedEntity,
            [fieldName]: content,
        });
    };

    const saveAlert = () => {
        if (alert) {
            return (
                <div style={{ margin: "0 0 10px 0" }}>
                    {saving ? (
                        <Alert severity="info">Saving</Alert>
                    ) : (
                        <Alert
                            severity="success"
                            onClose={() => {
                                setAlert(false);
                            }}
                        >
                            Saved!
                        </Alert>
                    )}
                </div>
            );
        }
    };

    //RENDER
    return (
        <div className={classes.root}>
            <Paper elevation={3} style={{ padding: "2rem 3rem" }}>
                <h1>
                    Editing {cmsObject.entity}:{" "}
                    {entityData[cmsObject.entityNameField]}
                </h1>
                <h2>
                    {cmsObject.entity} ID: {entityData[cmsObject.entityIdField]}
                </h2>
                <h2>{cmsData ? "CMS Data Only" : "CMS + P15 Data"}</h2>
                {cmsObject.entityCmsFieldList.map((field) => (
                    <CmsBlock
                        entityDetails={{
                            pageType: cmsObject.entity,
                            pageName: entityData[cmsObject.entityNameField],
                            pageId: entityData[cmsObject.entityIdField],
                        }}
                        updatedEntity={updatedEntity}
                        cmsBlockType={field.displayType}
                        cmsBlockTitle={field.title}
                        fieldName={field.name}
                        fieldUpdateUrl={cmsObject.entityUpdateUrl}
                        entityId={entityData[cmsObject.entityIdField]}
                        entityName={cmsObject.entityName}
                        updateEntity={updateEntity}
                        implicitUpdateEntity={implicitUpdateEntity}
                    />
                ))}
                <div
                    style={{
                        width: 150,
                        position: "fixed",
                        right: 25,
                        bottom: 75,
                        textAlign: "right",
                    }}
                >
                    {saveAlert()}
                    {cmsData ? (
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={function () {
                                setAlert(true);
                                setSaving(true);
                                let auxBody = {
                                    ...updatedEntity,
                                };
                                let postObject = {
                                    method: "PUT",
                                    body: {
                                        pageData: auxBody,
                                    },
                                };
                                console.log(postObject);
                                // GetTripByTripCode(tripCode);
                                api(
                                    cmsObject.entityUpdateUrl +
                                        entityData[cmsObject.entityIdField],
                                    postObject
                                ).then((data) => {
                                    console.log(data);
                                    setSaving(false);
                                });
                            }}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={function () {
                                setAlert(true);
                                setSaving(true);
                                let postObject = {
                                    method: "POST",
                                    body: {
                                        entityId:
                                            entityData[cmsObject.entityIdField],
                                        ...updatedEntity,
                                    },
                                };
                                console.log(postObject);
                                // GetTripByTripCode(tripCode);
                                api(cmsObject.entityUpdateUrl, postObject).then(
                                    (data) => {
                                        console.log(data);
                                        setSaving(false);
                                    }
                                );
                            }}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </Paper>
        </div>
    );
}
