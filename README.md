humbleSlider-jQuery
===================

###The be-all-end-all responsive, swipe-supporting jQuery gallery solution.
No, not really, but I tried!

####Features
* Responsive images via hisrc
⋅That means pixel density and network speed are considered when loading images.
* Responsive layout that always maintains aspect ratio.
* Navigation bar.
* Current image / total images counter.
* Infinite scroll, so that the awesomeness never ends.
* Supports swipe gestures for touch devices.
* Keyboard support to slide through images.
* Most things can be configured to meet your needs.

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
What's going on with those images, you ask. This is hisrc's way of providing multiple versions of the same image, from low res to std res to high res, which is essential to cover the wide range of native resolutions and viewport sizes we see today. hisrc also detects the network speed of your users and then, combined with the pixel density aspect, loads the most appropriate image.

####Credits
This plugin makes heavy use of [hisrc](https://github.com/teleject/hisrc) and [jquery.touchSwipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin). Many many thanks to you guys.
