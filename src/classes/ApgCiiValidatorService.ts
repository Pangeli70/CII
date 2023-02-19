/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/04/03] Porting to Deno
 * @version 0.9.2 [APG 2022/11/30] Github beta
 * @version 0.9.3 [APG 2022/12/18] Deno Deploy
 * @version 0.9.4 [APG 2023/01/07] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII.
 * @version 0.9.5.1 [APG 2023/02/18] Moved to singleton service.
 * -----------------------------------------------------------------------
 */

import { Lgr, Rst, Jsv } from "../../deps.ts";

import { ApgCiiValidators } from "../data/ApgCiiValidators.ts";
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../interfaces/IApgCiiInstruction.ts";


/** Apg Cad Instructions Interpreter
 */
export class ApgCiiValidatorService {

  private static _logger: Lgr.ApgLgr | undefined = undefined;

  private static _loggable: Lgr.ApgLgrLoggable | undefined = undefined;

  private static _validators: Map<eApgCiiInstructionTypes, Jsv.ApgJsvAjvValidator> = new Map();

  private static _initialized = false;

  private static _status = Rst.ApgRstErrors.Simple("Validator not initialized");
  /** Object initialization result */
  static get Status() { return this._status; }


  static Validate(ainstructions: IApgCiiInstruction[]) {

    let r: Rst.IApgRst = { ...this._status };

    if (!this._initialized) {
      r = this.#init();
    }

    if (r.ok) {
      this._loggable!.logBegin(this.Validate.name);

      r = this.#validateInstructionsWithAjv(ainstructions);
      if (r.ok) {
        r = this.#checkFirstInstruction(ainstructions);
      }

      this._loggable!.logEnd(this._status);
    }

    return r

  }


  static #init() {

    this._logger = new Lgr.ApgLgr('ApgCiiValidatorServiceLogger');
    this._loggable = new Lgr.ApgLgrLoggable('ApgCiiValidatorsService', this._logger);
    this._loggable.logBegin(this.#init.name);

    this._status = this.#getValidators(this._loggable, this._logger);
    if (this._status.ok) {
      this._initialized = true;
    }
    this._loggable.logEnd(this._status);
    return this._status;
  }


  static #getValidators(aloggable: Lgr.ApgLgrLoggable, alogger: Lgr.ApgLgr) {

    aloggable.logBegin(this.#getValidators.name);
    let r: Rst.IApgRst = { ok: true };

    const validatorService = new Jsv.ApgJsvService(alogger);

    ApgCiiValidators.forEach(element => {
      if (r.ok && element.jsonSchema) {
        const deps = element.dependencies ? element.dependencies : [];
        r = validatorService.addValidator(element.jsonSchema, deps);
        if (r.ok) {
          const validatorName = element.jsonSchema.$id.replaceAll("#", "");
          const validator = validatorService.getValidator(validatorName);
          this._validators.set(element.type, validator!);
        }
      }
    });

    aloggable.logEnd(r);
    return r;
  }


  static #validateInstructionsWithAjv(instructions: IApgCiiInstruction[]) {

    let r: Rst.IApgRst = { ok: true };

    const genVal = this._validators.get(eApgCiiInstructionTypes.GENERIC);

    if (!genVal) {
      r = Rst.ApgRstErrors.Parametrized(
        "Validator [%1] Not found", [eApgCiiInstructionTypes.GENERIC]
      );
    }
    else {
      instructions.forEach(instruction => {

        if (r.ok) {

          r = genVal!.validate(instruction);

          if (r.ok) {

            const instVal = this._validators.get(instruction.type);

            if (!instVal) {
              r = Rst.ApgRstErrors.Parametrized(
                "Validator [%1] Not found", [instruction.type]
              );
            }
            else {
              r = instVal!.validate(instruction);
              // debugger;
            }
          }
        }
      });
    }

    return r;
  }


  static #checkFirstInstruction(instructions: IApgCiiInstruction[]) {
    let r: Rst.IApgRst = { ok: true };

    if (instructions[0].type !== eApgCiiInstructionTypes.SET_NAME) {
      r = Rst.ApgRstErrors.Parametrized(
        "[%1] not found as first instruction",
        [eApgCiiInstructionTypes.SET_NAME]
      );
    }

    return r;
  }


}
