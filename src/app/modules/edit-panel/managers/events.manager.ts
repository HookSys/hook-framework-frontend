interface Event {
    field: string;
    callback: Function;
}

export class EventsManager {
    private onChangeListeners: Event[] = [];
    private onBlurListeners: Event[] = [];
    private onFocusListeners: Event[] = [];

    public addChangeListener(field: string, callback: Function) {
        this.onChangeListeners.push({ field, callback });
    }

    public addBlurListener(field: string, callback: Function) {
        this.onBlurListeners.push({ field, callback });
    }

    public addFocusListener(field: string, callback: Function) {
        this.onFocusListeners.push({ field, callback });
    }

    public removeChangeListener(field: string) {
        this.onChangeListeners = this.onChangeListeners.filter(listener => {
            if (listener.field !== field) {
                return listener;
            }
        });
    }

    public removeBlurListener(field: string) {
        this.onBlurListeners = this.onBlurListeners.filter(listener => {
            if (listener.field !== field) {
                return listener;
            }
        });
    }

    public removeFocusListener(field: string) {
        this.onFocusListeners = this.onFocusListeners.filter(listener => {
            if (listener.field !== field) {
                return listener;
            }
        });
    }

    public fireOnChange(event: any) {
        this.onChangeListeners.map(listener => {
            if (listener.field === event.target.name && listener.callback) {
                listener.callback(event);
            }
        });
    }

    public fireOnBlur(event: any) {
        this.onBlurListeners.map(listener => {
            if (listener.field === event.target.name && listener.callback) {
                listener.callback(event);
            }
        });
    }

    public fireOnFocus(event: any) {
        this.onFocusListeners.map(listener => {
            if (listener.field === event.target.name && listener.callback) {
                listener.callback(event);
            }
        });
    }
}
