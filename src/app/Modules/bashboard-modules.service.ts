import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";

import { StorageNames } from "../Data/storagenames";
import { BashBoardModule } from "../Model/BashBoardModule";
import { ItemConfig } from "../Model/ItemConfig";
import { Modules } from "./Modules";

@Injectable()
export class BashBoardModulesService {
    constructor(private storage: LocalStorageService) { }

    getModules(): BashBoardModule[] {
        let itemConfigsFromStorage = this.storage.retrieve(StorageNames.ITEMCONFIGS) as ItemConfig[];
        if (!itemConfigsFromStorage) {
            return this.getDefaultModules();
        }

        let modules = itemConfigsFromStorage.map(itemConfig => this.getModuleByConfig(itemConfig));

        return modules.length > 0 ? modules : this.getDefaultModules();
    }

    getModuleByConfig(config: ItemConfig): BashBoardModule {
        if (Modules[config.moduleType]) {
            return new Modules[config.moduleType](config) as BashBoardModule;
        }
    }

    getDefaultModules(): BashBoardModule[] {
        let modules: BashBoardModule[] = [new Modules.KlokModuleComponent()];
        return modules;
    }

    setModules(modules: BashBoardModule[]): void {
        let configs = modules.map(module => module.getConfig());
        this.storage.store(StorageNames.ITEMCONFIGS, configs);
    }
}
