import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";

import { StorageNames } from "../Data/storagenames";
import { ItemConfig } from "../Model/ItemConfig";

@Injectable()
export class BashBoardModulesService {
    constructor(private storage: LocalStorageService) { }

    getConfigs(): ItemConfig[] {
        return this.storage.retrieve(StorageNames.ITEMCONFIGS) as ItemConfig[];
    }

    saveConfigs(configs: ItemConfig[]): void {
        this.storage.store(StorageNames.ITEMCONFIGS, configs);
    }
}
