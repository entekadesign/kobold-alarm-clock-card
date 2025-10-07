// HA types
import type { LovelaceCard } from "custom-card-helpers";

export class Helpers {

    static getHa = () => {
        let root: any = document.querySelector('home-assistant');
        return root;
    }

    static getEditor = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        // console.log('*** getEditor(); root: ', root);
        return root;
    };

    static getPreview = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        root = root && root.shadowRoot;
        root = root && root.querySelector('div.element-preview');
        // console.log('*** getPreview(); root: ', root);
        return root;
    };

    static getEditorButtons = () => {
        let root: any = this.getEditor();
        root = root && root.shadowRoot;
        root = root && root.querySelector('div[slot="primaryAction"]');
        // console.log('*** getEditorButtons(); root: ', root);
        return root;
    }

    static getLovelace = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-panel-lovelace');
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-root');
        // console.log('*** getLovelace(); root: ', root);
        return root;
    };


    static getBackground = () => {
        let root: any = this.getLovelace();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-view-background');
        // console.log('*** getBackground(); root: ', root);
        return root;
    };

    static getDrawer = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-drawer');
        root = root && root.shadowRoot;
        root = root && root.querySelector('aside');
        // console.log('*** getDrawer(); root: ', root);
        return root;
    };

    static getNotification = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('notification-manager');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-toast');
        // console.log('*** getNotification(); root: ', root);
        return root;
    };

    static fireEvent = (event, detail = undefined, element = this.getLovelace()) => {
        element.dispatchEvent(new CustomEvent(event, { detail, bubbles: true, cancelable: false, composed: true, }));
    }

    static deepMerge(obj1, obj2) {
        const result = { ...obj1 };

        for (let key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
                    result[key] = this.deepMerge(obj1[key], obj2[key]);
                } else {
                    result[key] = obj2[key];
                }
            }
        }

        return result;
    }

    // returns object containing all and only changed properties
    static deepCompareObj(original, current) {
        if (original === current) return null;

        // Handle non-object types (including null)
        if (
            typeof original !== 'object' ||
            typeof current !== 'object' ||
            original === null ||
            current === null
        ) {
            return current;
        }

        const changes = {};
        let hasChanges = false;

        // Check for changes in current object
        for (const key of Object.keys(current)) {
            if (!(key in original)) {
                changes[key] = current[key];
                hasChanges = true;
                continue;
            }

            const diff = this.deepCompareObj(original[key], current[key]);
            if (diff !== null) {
                changes[key] = diff;
                hasChanges = true;
            }
        }

        // Check for deleted keys
        for (const key of Object.keys(original)) {
            if (!(key in current)) {
                changes[key] = undefined;
                hasChanges = true;
            }
        }

        return hasChanges ? changes : null;
    }

    static findNested(obj, key, val) {
        let found;
        JSON.stringify(obj, (_, nestedVal) => {
            if (nestedVal && nestedVal[key] === val) {
                found = nestedVal;
            }
            return nestedVal;
        });
        return found;
    };

    static throttle<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
        let timerFlag = null;
        return (...args: T) => {
            if (timerFlag === null) {
                fn(...args);
                timerFlag = setTimeout(() => {
                    timerFlag = null;
                }, delay);
            }
        };
    }

    // source: https://github.com/home-assistant/frontend/blob/dev/src/common/config/version.ts
    // @param version (this._hass.config.version)
    // @param major (major version number)
    // @param minor (minor version number)
    // @returns boolean
    static atLeastVersion = (
        version: string,
        major: number,
        minor: number,
        patch?: number
    ): boolean => {

        const [haMajor, haMinor, haPatch] = version.split(".", 3);

        return (
            Number(haMajor) > major ||
            (Number(haMajor) === major &&
                (patch === undefined
                    ? Number(haMinor) >= minor
                    : Number(haMinor) > minor)) ||
            (patch !== undefined &&
                Number(haMajor) === major &&
                Number(haMinor) === minor &&
                Number(haPatch) >= patch)
        );
    };

    static testUntilTimeout = async (f: () => boolean, timeoutMs: number) => {
        return new Promise((resolve, reject) => {
            const timeWas = new Date();
            const wait = setInterval(function () {
                if (f()) {
                    clearInterval(wait);
                    resolve('resolved');
                } else if (new Date().valueOf() - timeWas.valueOf() > timeoutMs) { // Timeout
                    clearInterval(wait);
                    reject('timed out');
                }
            }, 20);
        });
    }

    static updateHeight(element: LovelaceCard): boolean {
        if (this._updateHeightOnNormalCard(element)) return true;
        if (this._updateHeightOnNestedCards(element)) return true;
        return false;
    }
    static _updateHeightOnNormalCard(element: LovelaceCard) {
        if (element.shadowRoot) {
            let cardTag: LovelaceCard = element.shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    static _updateHeightOnNestedCards(element: LovelaceCard) {
        if (element.firstChild && element.children[0].shadowRoot) {
            let cardTag: LovelaceCard = element.children[0].shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
}