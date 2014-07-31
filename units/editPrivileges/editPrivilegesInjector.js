var linkToThis = {
    "groups": [
        {
            "menus": [
                {
                    "link": "roles",
                    "title": "Roles"
                }
            ],
            "title": "Nav"
        }
    ]
};

mergeJson(getModel('VerticalMenu'), linkToThis, "title", "title");
