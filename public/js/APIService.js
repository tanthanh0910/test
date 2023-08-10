class APIService {
    constructor(url) {
        this._url = url;
        this._data = null;
        this._method = 'get';
        this._processData = true;
        this._contentType = null;
        this._dataType = null;

        this.loading = Loading.init();

        this._showLoadingFn   = () => this.loading.show('Processsing');
        this._stopLoadingFn   = () => this.loading.hide();
        this._loadingDisabled = false;
    }

    static init(url){
        return new APIService(url);
    }

    url(value) {
        this._url = value;
        return this;
    }

    data(value) {
        this._data = value;
        return this;
    }

    dataType(value) {
        this._dataType = value;
        return this;
    }

    formData(value) {
        this._data = value;
        this._processData = false;
        this._contentType = false;
        return this;
    }

    method(value) {
        this._method = value;
        return this;
    }

    contentType(value) {
        this._contentType = value;
        return this;
    }

    get() {
        this._method = 'get';
        return this.execute();
    }

    post() {
        this._method = 'post';
        return this.execute();
    }

    beforeSend(callback) {
        this._beforeSend = callback;
        return this;
    }

    success(callback) {
        this._success = callback;
        return this;
    }

    fail(callback) {
        this._fail = callback;
        return this;
    }

    final(callback) {
        this._final = callback;
        return this;
    }

    execute() {
        if (!this._loadingDisabled) {
            this._showLoadingFn();
        }

        const $this = this;
        const ajaxOptions = {
            url: this._url,
            type: this._method,
            data: this._data,
            processData: this._processData,
            success: function(result) {
                if ($this._contentType === 'html' || result.code > 0) {
                    $this._success && $this._success(result);
                } else {
                    $this._fail && $this._fail(result);
                }

                $this._final && $this._final(result);
            },
            error: function(result) {
                if (result.readyState === 0) {
                    alert("Mất kết nối, vui lòng thử lại sau.");
                } else {
                    $this._fail && $this._fail(result.responseJSON);
                }

                $this._final && $this._final(result.responseJSON);
            },
            complete: function () {
                if (!$this._loadingDisabled) {
                    $this._stopLoadingFn();
                }
            }
        };

        if (this._dataType !== null) {
            ajaxOptions.dataType = this._dataType;
        }

        if (this._contentType !== null) {
            ajaxOptions.contentType = this._contentType;
        }

        if (this._beforeSend && typeof this._beforeSend === 'function') {
            ajaxOptions.beforeSend = this._beforeSend;
        }

        $.ajax(ajaxOptions);
    }

    // Methods related with Loading instance
    setLoadingContainer($element) {
        this.loading.container($element);
        return this;
    }

    noLoading() {
        this._loadingDisabled = true;
        return this;
    }

    showLoading(callback) {
        this._showLoadingFn = callback;
        return this;
    }

    stopLoading(callback) {
        this._stopLoadingFn = callback;
        return this;
    }
}
