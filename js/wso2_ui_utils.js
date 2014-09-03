//Constraints
var WSO2_UI_MAIN_LEFTMENU = "WSO2_UI_MAIN_LEFTMENU";
var WSO2_UI_FIXED_CONTAINER = "WSO2_UI_FIXED_CONTAINER";
var WSO2_UI_SHOW_HELP = "WSO2_UI_SHOW_HELP";
var WSO2_UI_SHOW_COMPATIBILITY = "WSO2_UI_SHOW_COMPATIBILITY";
if( !('wso2_ui' in window) ) window['wso2_ui'] = {}; //see the object wso2_ui exists and create it if not.
/*******************************
*
 * Notify pane on right
 *
 *****************************/
wso2_ui.rightPanel = {};
wso2_ui.rightPanel.setRightSize = function(){
    $('.scrollable').height($(document).height() - 160 - parseInt($('.scrollable').position().top));
};
wso2_ui.rightPanel.init = function(){
    $(window).resize(function(){
        wso2_ui.rightPanel.setRightSize();
    });
    wso2_ui.rightPanel.setRightSize();

    $('#wso2-right-panel-btn').click(function(){
        $(this).toggleClass("open");
        $('#wso2-right-panel-box').toggleClass("open");
    });
    $(window).resize(function(){
        wso2_ui.rightPanel.setRightSize();
    });
    wso2_ui.rightPanel.setRightSize();
};

/********************************
 *
 * Left menu
 *
 *******************************/
wso2_ui.leftmenu = {};
wso2_ui.leftmenu.init = function(){
    $('#leftmenu-collapse').click(function(){
        var $obj = $('i',this);
        var $leftmenu =  $('#leftmenu');

        if($obj.hasClass("fa-chevron-left")){                                      //Minified state
            $obj.removeClass("fa-chevron-left").addClass("fa-chevron-right");
            $leftmenu.addClass("menu-min");
            amplify.store(WSO2_UI_MAIN_LEFTMENU,"minified");
        }else{                                                                          //Big state
            $obj.removeClass("fa-chevron-right").addClass("fa-chevron-left");
            $leftmenu.removeClass("menu-min");
            amplify.store(WSO2_UI_MAIN_LEFTMENU,"");

        }
    });

    $('#leftmenu .dropdown-toggle').click(function(){
        var $target = $(this);
        var $submenu = $('> .submenu',$target.parent());
        if(! $target.parent().hasClass("open")){
            $target.parent().addClass("open");
            $submenu.removeClass('nav-show').addClass('nav-hide').slideToggle('fast');
        }else{
            $target.parent().removeClass("open");
            $submenu.removeClass('nav-hide').addClass('nav-show').slideToggle('fast');
        }
    });


    var $obj = $('#leftmenu-collapse i');
    var $leftmenu =  $('#leftmenu');

    if(amplify.store(WSO2_UI_MAIN_LEFTMENU) == "minified" && $obj.hasClass("fa-chevron-left")){                                      //Minified state
        $obj.removeClass("fa-chevron-left").addClass("fa-chevron-right");
        $leftmenu.addClass("menu-min");

    }else if($obj.hasClass("fa-chevron-right")){
        $obj.removeClass("fa-chevron-right").addClass("fa-chevron-left");
        $leftmenu.removeClass("menu-min");
    }
};
/********************************
 *
 * Settings box
 *
 *******************************/
wso2_ui.settings_box = {};
wso2_ui.settings_box.init = function(){
    $('#wso2-ui-main-settings').on("click","input, label", function(e){
        var $checkBox = $(this);
        if($checkBox.val() == "fixed-container"){
            if($checkBox.prop("checked")){
                wso2_ui.settings_box.toggleFixedSize('fixed');
            }else{
                wso2_ui.settings_box.toggleFixedSize('');
            }
        }else if($checkBox.val() == "developer-help"){
            if($checkBox.prop("checked")){
                wso2_ui.settings_box.toggleHelp('show');
            }else{
                wso2_ui.settings_box.toggleHelp('');
            }
        }else if($checkBox.val() == "browser-compatibility"){
            if($checkBox.prop("checked")){
                wso2_ui.settings_box.toggleCompatibility('show');
            }else{
                wso2_ui.settings_box.toggleCompatibility('');
            }
        }

        e.stopPropagation();
    });

    //checking the fixed size
    if(amplify.store(WSO2_UI_FIXED_CONTAINER) == "fixed"){
        $('#main-container').addClass("container");
        $('#navbar-container').addClass("container");
        $('#wso2-ui-main-settings input[value="fixed-container"]').prop("checked",true);

    }else{
        $('#main-container').removeClass("container");
        $('#navbar-container').removeClass("container");
        $('#wso2-ui-main-settings input[value="fixed-container"]').prop("checked",false);

    }

    //checking the help visibility
    if(amplify.store(WSO2_UI_SHOW_HELP) == "show"){
        $('.help_panel').show();
        $('#wso2-ui-main-settings input[value="developer-help"]').prop("checked",true);
    }else{
        $('.help_panel').hide();
        $('#wso2-ui-main-settings input[value="developer-help"]').prop("checked",false);
    }

    //checking the compatibility visibility
    if(amplify.store(WSO2_UI_SHOW_COMPATIBILITY) == "show"){
        $('.compatibility_panel').show();
        $('#wso2-ui-main-settings input[value="browser-compatibility"]').prop("checked",true);
    }else{
        $('.compatibility_panel').hide();
        $('#wso2-ui-main-settings input[value="browser-compatibility"]').prop("checked",false);
    }
};
wso2_ui.settings_box.toggleFixedSize = function(state){
    if(state == "fixed"){
        $('#main-container').addClass("container");
        $('#navbar-container').addClass("container");
        amplify.store(WSO2_UI_FIXED_CONTAINER,"fixed");
    }else{
        $('#main-container').removeClass("container");
        $('#navbar-container').removeClass("container");
        amplify.store(WSO2_UI_FIXED_CONTAINER,"");
    }
};
wso2_ui.settings_box.toggleHelp = function(state){
    if(state == "show"){
        $('.help_panel').show();
        amplify.store(WSO2_UI_SHOW_HELP,"show");
    }else{
        $('.help_panel').hide();
        amplify.store(WSO2_UI_SHOW_HELP,"");
    }
};
wso2_ui.settings_box.toggleCompatibility = function(state){
    if(state == "show"){
        $('.compatibility_panel').show();
        amplify.store(WSO2_UI_SHOW_COMPATIBILITY,"show");
    }else{
        $('.compatibility_panel').hide();
        amplify.store(WSO2_UI_SHOW_COMPATIBILITY,"");
    }
};

/********************************
 *
 * Loading animation
 *
 *******************************/
wso2_ui.loadingAnimation = {};
wso2_ui.loadingAnimation.show = function(container){
    var $container = $(container);
    $('.modal-backdrop-inside',$container).remove();
    $container.append('<div class="modal-backdrop fade in modal-backdrop-inside"><i class="fa fa-circle-o-notch fa-spin wso2-icon-on-top"></i></div>');

};
wso2_ui.loadingAnimation.hide = function(container){
    var $container = $(container);
    $('.modal-backdrop-inside',$container).remove();
};
wso2_ui.loadingAnimationInline = {};
wso2_ui.loadingAnimationInline.show = function(container){
    var $container = $(container);
    $('.loading-inline-container',$container).remove();
    $container.append('<div class="loading-inline-container"><i class="fa fa-circle-o-notch fa-spin wso2-icon-on-top"></i></div>');

};
wso2_ui.loadingAnimationInline.hide = function(container){
    var $container = $(container);
    $('.loading-inline-container',$container).remove();
};