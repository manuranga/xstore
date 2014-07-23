var linkToThis = {
    "groups": [
        {
            "menus": [
                {
                    "link": "assets",
                    "title": "Assets"
                }
            ],
            "title": "Nav"
        }
    ]
};

mergeJson(getModel('VerticalMenu'), linkToThis, "title", "title");
