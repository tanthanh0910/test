class Loading {
    constructor() {
        this.$container   = $('body');
        this.isFullScreen = true;
    }

    container($container) {
        if ($container.hasClass('modal')) {
            $container = $container.find('.modal-dialog');
        }

        this.isFullScreen = false;
        this.$container   = $container;
    }

    show(message = null) {
        this.$el = this.render();

        if (this.isFullScreen) {
            this.$el.addClass('full-screen');
        } else {
            this.$el.removeClass('full-screen');
        }

        this.$el.find('.message').text(message || '');
        this.$el.css('visibility', 'visible');
        this.$container.css({
            overflow: 'hidden',
            'max-height': '100%'
        });

        return this;
    }

    hide() {
        if (!this.$el) {
            return;
        }

        this.$el.css('visibility', '');
        this.$container.css({
            overflow: '',
            'max-height': ''
        });
    }

    render() {
        if (!this.$container.find('.loading').length) {
            this.$container.append(`
                <div class="loading">
                    <div class="spinner"></div>
                    <div class="message"></div>
                </div>
            `);
        }

        return this.$container.find('.loading');
    }

    static init() {
        return new Loading;
    }
};
