//Define Homepage CMS Object
const cmsObject = {
    entity: "Page",
    entityIdField: "_id",
    entityNameField: "pageName",
    entityFetchUrl: "/api/v1/pages/",
    entityUpdateUrl: "/api/v1/pages/",
    entityCmsFieldList: [
        {
            name: "cms_main_banner",
            displayType: "Image",
            title: "Main Banner",
        },
        {
            name: "cms_main_title",
            displayType: "Text",
            title: "Main Title",
        },
        {
            name: "cms_introduction_copy",
            displayType: "WYSIWYG",
            title: "Introduction Copy",
        },
        {
            name: "cms_ideal_travel_months",
            displayType: "Month Checkboxes",
            title: "Ideal Travel Months",
        },
        {
            name: "cms_secondary_title",
            displayType: "Text",
            title: "Secondary Title",
        },
        {
            name: "cms_secondary_copy",
            displayType: "WYSIWYG",
            title: "Secondary Copy",
        },
    ],
};

export default cmsObject;
