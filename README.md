humbleSlider-jQuery
===================

###The be-all-end-all responsive, swipe-supporting jQuery gallery solution.
No, not really, but I tried!
Here is a [DEMO](http://humbleslider.webnitr.at/) of what it can look like!

####Features
* Responsive images via hisrc, that means pixel density and network speed are considered when loading images.
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
            <div class="img-container">
                <img src="img/img1.jpg" data-1x="img/img1@1x.jpg" data-2x="img/img1@2x.jpg">
            </div>
        </div>
        <div class="slider-image">
            <div class="img-container">
                <img src="img/img2.jpg" data-1x="img/img2@1x.jpg" data-2x="img/img2@2x.jpg">
            </div>
        </div>
        <div class="slider-image">
            <div class="img-container">
                <img src="img/img1.jpg" data-1x="img/img3@1x.jpg" data-2x="img/img3@2x.jpg">
            </div>
        </div>
    </div>
</div>
```
What's going on with those images, you ask. This is hisrc's way of providing multiple versions of the same image, from low res to std res to high res, which is essential to cover the wide range of native resolutions and viewport sizes we see today. hisrc also detects the network speed of your users and then, combined with the pixel density aspect, loads the most appropriate image. The low res image is provided through the normal `src`-tag, which also acts as a fallback for older devices or placeholder untill the higher res images are loaded.
The `data-1x` and `data-2x` tags contain the URLs of the std res and hi res image, respectively.
(Note that what is "low res", "std res" or "hi res" is merely a terminology issue. You can and should adapt how you use those three versions to best fit your application).

####The config
Simply pass this object when calling the plugin like so `$('').humbleSlider({/* config */});`.
Default values will be used for any property not passed in the config.
```javascript
{
        /**
         * Duration in seconds for sliding one image. Sliding 3 images means (3 * speed) = 1.5 sec default
         */
        speed:  0.5,

        /**
         * configures touch gesture support
         *
         * trigger: slider must have a parent element matching this selector, to support swipe.
         * default value '.touch' aims for Modernizr, which will put .touch on html if touch events present.
         *
         * if swipe should always be active, set this to 'html' or 'body'.
         */
        swipe: {
        enabled: true,
            trigger: '.touch'
        },

        /**
         * configures key navigation support
         * previous / next values represent the key number, default is left and right arrow key.
         */
        key: {
            enabled: true,
            previous: 37,
            next: 39
        },

        navigation: true, // you really shouldn't disable it!
        
        /**
         * Path to image that will be shown in the navigation bar...
         * Default is a white base64 encoded SVG arrow
         */
        nextImage: 'data:image/svg+xml;base64...',
        
        /**
        * example:
        * nextImage: '../img/arrow.png',
        */

        height: '50%' // aspect ratio of the images, 50% equals 2:1 ratio
    }
```

####Credits
This plugin makes heavy use of [hisrc](https://github.com/teleject/hisrc) and [jquery.touchSwipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin). Many many thanks to you guys.
