humbleSlider-jQuery
===================

###The be-all-end-all responsive, swipe-supporting jQuery gallery solution.
No, not really, but I tried!
This jQuery Plugin allows to easily create an image slider / gallery, that makes full use of responsive images, retina optimization, touch support [insert more fancy buzzwords here].

All you have to do is `$('#slider').humbleSlider();` and off we go.
Of course there is some markup necessary, which looks like this:

####The markup
```html
<div id="slider" class="slider">
    <div class="container">
        <div class="slider-image">
            <img src="img/img1.jpg" data-1x="img/img1@1x.jpg" data-2x="img/img1@2x.jpg">
        </div>
        <div class="slider-image">
            <img src="img/img2.jpg" data-1x="img/img2@1x.jpg" data-2x="img/img2@2x.jpg">
        </div>
        <div class="slider-image">
            <img src="img/img1.jpg" data-1x="img/img3@1x.jpg" data-2x="img/img3@2x.jpg">
        </div>
    </div>
</div>
```

The plugin makes use of [hisrc](https://github.com/teleject/hisrc) and [jquery.touchSwipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin)
