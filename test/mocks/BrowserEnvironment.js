/* global fhir */
import EventEmitter from "events";
import MemoryStorage from "./MemoryStorage";
import Location      from "./Location";

export default class BrowserEnvironment extends EventEmitter
{
    constructor(options)
    {
        super();
        this.options = {
            replaceBrowserHistory: true,
            fullSessionStorageSupport: true,
            ...options
        };
        this._location = new Location("http://localhost");
    }

    get fhir()
    {
        return typeof fhir === "function" ? fhir : null;
    }

    getUrl()
    {
        return new URL(this._location.href);
    }

    redirect(to)
    {
        this._location.href = to;
        this.emit("redirect");
    }

    getStorage()
    {
        if (!this._storage) {
            this._storage = new MemoryStorage();
        }
        return this._storage;
    }

    relative(url)
    {
        return new URL(url, this._location.href).href;
    }
}
