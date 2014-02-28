(function($) {

	$.fn.humbleSlider = function humbleSlider(config) {

        function HumbleSlider(el, config) {
            this.$el = $(el);
            this.$container = this.$el.find(".container");
            this.$images = this.$container.find(".slider-image");

            this.config = config;
            
            this.$container.css('transition', 'left ' + this.config.speed + 's ease');


            this.currentImage = 0;
            this.totalImages = null;

            this.init();
        }

        HumbleSlider.prototype = {
            /**
             * checks if this slider contains only one image
             * @returns {boolean}
             */
            isSingular : function() {
                return ($(this.$el).find(".slider-image").not(".overview").length) <= 1;
            },

            init : function () {

                /**
                 * TODO
                 * refactor according to presence of overview feature
                 */

                //$(this.config.swipe.trigger).find(this.$el).find('.overview').remove();

                // add controls to DOM
                if(!this.isSingular() && this.config.navigation) {
                    this.$el.append(
                        "<a href='#' class='slider-controls'>" +
                            "<span class='next'>&raquo;</span>" +
                            "<span class='counter'>" + (this.currentImage + 1) + "/" + (this.totalImages) + "</span>" +
                        "</a>"
                    );
                }

                /**
                 * Slide to next image when slider controls are clicked
                 */
                this.$el.find(".slider-controls").on("click", function(e) {
                    e.preventDefault();
                    this.inputHandler(1);
                }.bind(this));

                /**
                 * TODO
                 * refactor according to presence of overview feature
                 */

                // this.$el.find(".thumbnail-image").on("click", this.thumbnailListener.bind(this));


                if (this.totalImages == 1) {
                    // hide controls, in case they somehow made it into the markup
                    this.$el.find(".slider-controls").addClass("hide");
                } else {
                    // stop suggesting swipe, if present, as soon as the slider is clicked on
                    this.$el.on('click', function() {
                        clearInterval(this.swipeSuggestInterval);
                    });
                }

                if(this.config.swipe.enabled) {
                    $(this.config.swipe.trigger).find(this.$container).swipe( {
                        triggerOnTouchEnd : true,
                        swipeStatus : this.swipeStatus.bind(this),
                        allowPageScroll:"vertical"
                    });
                }

                // support slider navigation by arrow keys
                $(document).keydown(function(e){
                    switch(e.which) {
                        case this.config.key.previous: // previous image
                            this.inputHandler(-1);
                            break;

                        case this.config.key.next: // next image
                            this.inputHandler(1);
                            break;

                        default: return; // exit this handler for other keys
                    }
                    e.preventDefault();
                }.bind(this));

                this.totalImages = this.$el.find('.slider-image').length;
                this.adjustSize();
                this.refreshCounter();
            },

            /**
             * TODO
             * refactor according to presence of overview feature
             * @param e event for click on thumbnail
            thumbnailListener : function(e) {
                e.preventDefault();
                var transitionOffset = this.currentImage;
                this.currentImage = parseInt(e.currentTarget.dataset.image, 10);
                transitionOffset -= this.currentImage;
                this.slide(transitionOffset);
            },
            */

            /**
             * Adjust all css values so the slider can actually work
             */
            adjustSize : function() {
                this.$el.css("overflow", "hidden");
                this.$container.css({
                    width: this.totalImages * 100 + "%"
                });
                this.$images.css({
                    float: "left",
                    width: 100 / this.totalImages + "%"
                });
                
                this.$images.find('img').hisrc({useTransparentGif: true})
                    .css({
                        'height': 0,
                        'padding-top': this.config.height
                    });
            },

            /**
             * Set the counter text according to the current image
             */
            refreshCounter : function() {
                this.$el.find(".counter").text((this.currentImage+1) + "/" + (this.totalImages));
            },

            /**
             * TODO
             * refactor according to presence of overview feature
            refreshControls : function() {
                if(this.currentImage === this.totalImages-1) {
                    this.$el.find(".slider-controls").addClass("hide");
                } else {
                    this.$el.find(".slider-controls").removeClass("hide");
                }
            },
             */

            /**
             * The actual magic.
             * @param offset (optional) defines time for transition by supplying the number of slided images.
             */
            slide : function(offset) {
                if(typeof offset == undefined) {
                    offset = 1;
                }
                offset = Math.abs(offset);

                this.$container.css({
                    transition: "left, " + this.config.speed * offset + "s ease",
                    left:   (this.currentImage * -100) + "%"
                });

                /**
                 * TODO
                 * refactor according to presence of overview feature
                this.refreshControls();
                 */

                this.refreshCounter();
            },

            /**
             * calculate new current image and then slide to it
             * @param offset - decides in which direction slide has to take place
             * long arithmetic term due to javascript modulo bug for negative numbers
             */
            inputHandler : function(offset) {
                var transitionOffset = this.currentImage;
                this.currentImage = (((this.currentImage + offset) % this.totalImages) + this.totalImages) % this.totalImages;
                transitionOffset -= this.currentImage;

                this.slide(transitionOffset);
            },

            setSwipeSuggest : function() {
                this.$container.css('left', '-15px');
                setTimeout(function() {
                    this.$container.css('left', '7px');

                    setTimeout(function() {
                        this.$container.css('left', '0px');
                    }, 250);
                }, 250);
            },

            swipeSuggestInterval : setInterval(this.setSwipeSuggest, 3000),

            /**
             * Simple function for swipe gesture to slide one image left
             */
            previousImage : function()
            {
                var transitionOffset = this.currentImage;
                this.currentImage = Math.max(this.currentImage-1, 0);
                transitionOffset -= this.currentImage;
                this.slide(transitionOffset);
            },

            /**
             * Simple function for swipe gesture to slide one image right
             */
            nextImage : function()
            {
                var transitionOffset = this.currentImage;
                this.currentImage = Math.min(this.currentImage +1, this.totalImages - 1);
                transitionOffset -= this.currentImage;
                this.slide(transitionOffset);
            },

            /**
             * Manually update the position of the $imgs on drag
             */
            scrollImages : function(distance, duration)
            {
                // clear swipeSuggestInterval on touch devices if still active
                if(this.swipeSuggestInterval) {
                    clearInterval(this.swipeSuggestInterval);
                }

                //inverse the number we set in the css
                var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
                this.$container.css("transition", "left " + duration + "s ease");
                this.$container.css("left", value +"%");
            },

            /**
             * Catch each phase of the swipe.
             * move : we drag the div.
             * cancel : we animate back to where we were
             * end : we animate to the next image
             */

            swipeStatus : function(event, phase, direction, distance, fingers)
            {
                var distance = 100 / $(this.$el).width() * distance;
                //If we are moving before swipe, and we are going L or R, then manually drag the images
                if( phase=="move" && (direction=="left" || direction=="right") )
                {
                    var duration=0;

                    if (direction == "left")
                        this.scrollImages((100 * this.currentImage) + distance, duration);

                    else if (direction == "right")
                        this.scrollImages((100 * this.currentImage) - distance, duration);
                }

                //Else, cancel means snap back to the begining
                else if ( phase == "cancel")
                {
                    this.scrollImages(100 * this.currentImage, this.speed);
                }

                //Else end means the swipe was completed, so move to the next image
                else if ( phase =="end" )
                {
                    if (direction == "right")
                        this.previousImage();
                    else if (direction == "left")
                        this.nextImage();
                }
            }
        }

		this.each(function() {
			var myConfig = $.extend({}, jQuery.fn.humbleSlider.DEFAULT_CONFIG, config);
			$(this).data('humbleSlider', new HumbleSlider(this, myConfig));
		});
		return this; //allow chaining
	};

    /**************************************************************************
     * YOU SHALL PASS (a config parameter instead of overwriting the default) *
     *************************************************************************/
	jQuery.fn.humbleSlider.DEFAULT_CONFIG = {
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

        height: '50%' // aspect ratio of the images, 50% equals 2:1 ratio
    };

})(jQuery);