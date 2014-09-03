if(! ("api_home"in wso2_ui)) {
    wso2_ui.api_home = {};
}
wso2_ui.api_home.init = function(){
    $('#thumbnail_container').on("click","button",function(){
        var info = $(this).attr("data-info");
        if(info == "show_more"){
            wso2_ui.loadingAnimation.show('#thumbnail_container');
            setTimeout("wso2_ui.api_home.showAll()",1000)
        }
    })

};
var rows_added = 0;
var last_to = 0;
var $toClone = $('#thumbnail_container_all .thumbnails > .thumbnail:first-child').hide();

wso2_ui.api_home.showAll = function(){
    wso2_ui.loadingAnimation.hide('#thumbnail_container');
    $('#thumbnail_container').hide();
    $('#thumbnail_container_all').show();
    wso2_ui.api_home.addItemsToPage();
    $(window).scroll(function(){
        wso2_ui.api_home.addItemsToPage();
    });
    $(window).resize(function () {
        //recalculate "rows_added"
        rows_added = wso2_ui.api_home.addItemsToPage.recalculateRowsAdded();
        wso2_ui.api_home.addItemsToPage();
    });
};
wso2_ui.api_home.addItemsToPage = function(){
    /*
     clean the counted rows from the session
     fist time load the viewable number of rows to the screen rows_per_page
     - Data for this are viewable width and height in the screen ( screen_width, screen_height)
     keep the rows counted in the session   (rows_added)

     calculate the row suppose to be displayed (row_current)
     -  rows_per_page and scroll position (scroll_pos)

     if(row_current > rows_added ) then
     - do a call to get the remaining rows and append them

     */
    var screen_width = $(window).width();
    var screen_height = $(window).height();

    var thumb_width = 160;
    var thumb_height = 266;

    var menu_width = 190;
    var header_height = 110;
    if($('#leftmenu').is(":visible")){
        screen_width = screen_width - menu_width;
    }
    screen_height = screen_height - header_height;

    var items_per_row = (screen_width-screen_width%thumb_width)/thumb_width;
    var rows_per_page = (screen_height-screen_height%thumb_height)/thumb_height;
    var scroll_pos = $(document).scrollTop();
    var row_current =  (screen_height+scroll_pos-(screen_height+scroll_pos)%thumb_height)/thumb_height;
    row_current++; // We increase the row current by 1 since we need to provide one additional row to scroll down without loading it from backend
    wso2_ui.api_home.addItemsToPage.recalculateRowsAdded = function(){
        return (last_to - last_to%items_per_row)/items_per_row;
    };

    var from = 0;
    var to = 0;
    if(row_current > rows_added){
        from = rows_added * items_per_row;
        to = row_current*items_per_row;
        last_to = to; //We store this os we can recalculate rows_added when resolution change
        rows_added = row_current;

        wso2_ui.api_home.getItems(from,to).done(function(data) {
            for(var i=0;i<data.length;i++){
                var $newElem = $toClone.clone().show();
                var $icon = $('i',$newElem).prop("class","fa wso2-icon-thumbnail " + data[i]);
                $('#thumbnail_container_all .thumbnails').append($newElem);
            }

        });
    }

};

wso2_ui.api_home.getItems = function(from,to){
    var dynamicData = {};
    dynamicData["from"] = from;
    dynamicData["to"] = to;
    // Returns the jQuery ajax method
    return $.ajax({
        url: "controls/get_items.jag",
        type: "get", //Set the async false since it wouldn't do the validation otherwise.
        dataType:"json",
        data: dynamicData
    });
};
$(document).ready(function(){
    wso2_ui.api_home.init();
});
