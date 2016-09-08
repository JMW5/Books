//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

    //Append New Chapter to Add New Form

    // <div class="form-group">
    //     <label>Chapter Title: </label>
    //     <input class="form-control" name="chapter_title" placeholder="Name of the Chapter" style="width: 25%;">
    // </div>

    $(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
        $(".alert-success").slideUp(500);
    });

    $(".alert-danger").fadeTo(2000, 500).slideUp(500, function(){
        $(".alert-danger").slideUp(500);
    });


    
    $('#addChapterBtn').click(function(){

        var div = $('<div class="form-group"></div>');

        div.html(
            "<label>Chapter Title:</label><input class='form-control' name='chapter_title' placeholder='Name of Chapter' style='width: 25%;'><br><textarea class='form-control' name='chapter_summary' placeholder='Important point in this chapter' style='width: 25%;'></textarea>"
        );  

        div.appendTo('#wrapper');

        counter++;

    });

    $("#lightSlider").lightSlider({
        item: 3,
        autoWidth: true,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 10
    }); 


    //Initially hide logoutBox
    //Use localStorage to change class on logoutBox
    //When logout button is clicked, show logoutBox then slide up



});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}