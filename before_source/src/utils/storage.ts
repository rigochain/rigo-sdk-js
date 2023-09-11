/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import {LocalStorage} from 'node-localstorage'

interface IStorage {
    Write(k:string, v:string):void // write
    Read(k: string):string|null; // read
}


class LocalSto {
    #storage: Storage

    constructor() {
        switch (runtimeEnvironment()) {
            case "browser":
                this.#storage = window.localStorage
                break
            case "nodejs":
                this.#storage = new LocalStorage('./nodeLocalStorage')
                break
        }
    }
    read(k: string): string | null {
        return this.#storage.getItem(k)
    }

    write(k: string, v: string): void {
        this.#storage.setItem(k, v)
    }


    static #obj:LocalSto
    static Read(k: string): string | null {
        if(!LocalSto.#obj) {
            LocalSto.#obj = new LocalSto()
        }
        return LocalSto.#obj.read(k)
    }
    static Write(k: string, v:string): void {
        if(!LocalSto.#obj) {
            LocalSto.#obj = new LocalSto()
        }
        return LocalSto.#obj.write(k,v)
    }
}

class SessSto {
    static #_data:{[key : string] : string }
    #storage
    constructor() {
        if(!SessSto.#_data) {
            SessSto.#_data = {}
        }
        switch (runtimeEnvironment()) {
            case "browser":
                this.#storage = window.sessionStorage
                break
            case "nodejs":
                this.#storage = {
                    setItem: (k:string, v:string) => SessSto.#_data[k] = v,
                    getItem: (k:string) => SessSto.#_data[k],
                    removeItem: (k:string) => delete SessSto.#_data[k],
                }
                break
        }
    }
    read(k: string): string | null {
        return this.#storage.getItem(k)
    }

    write(k: string, v: string): void {
        this.#storage.setItem(k, v)
    }

    static #obj:SessSto
    static Read(k: string): string | null {
        if(!SessSto.#obj) {
            SessSto.#obj = new SessSto()
        }
        return SessSto.#obj.read(k)
    }
    static Write(k: string, v:string): void {
        if(!SessSto.#obj) {
            SessSto.#obj = new SessSto()
        }
        return SessSto.#obj.write(k,v)
    }
}

function runtimeEnvironment() {

    // Check if the environment is a Browser
    if (typeof window === "object") {
        return 'browser';
    }

    // Check if the environment is a Service worker
    if (typeof importScripts === "function") {
        return 'worker';
    }

    // Check if the environment is Node.js
    // if (typeof process === "object" && typeof require === "function") {
    // if (typeof exports !== 'undefined' && this.exports !== exports) {
    if ((typeof process !== 'undefined')
        && (typeof process.release !== 'undefined')
        && (typeof process.release.name !== 'undefined')
        && (process.release.name.search(/node|io.js/) !== -1)) {
        return 'nodejs';
    }

    return 'unknown';
}

export {LocalSto, SessSto}

