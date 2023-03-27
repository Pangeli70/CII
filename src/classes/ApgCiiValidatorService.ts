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
 * @version 0.9.6 [APG 2023/03/18] Debugged logger.
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



  static Validate(ainstructions: IApgCiiInstruction[]) {

    let r: Rst.IApgRst = { ok: true };

    if (!this._initialized) {
      r = Rst.ApgRstErrors.Simple("ApgCiiValidatorService is not initialized")
    }

    if (r.ok) {
      this._loggable!.logBegin(this.Validate.name);

      r = this.#validateInstructionsWithAjv(ainstructions);

      this._loggable!.logEnd(r);
    }

    return r

  }


  static Init(alogger: Lgr.ApgLgr) {

    let r: Rst.IApgRst = { ok: true };

    if (this._initialized == true) {
      return r;
    }

    this._logger = alogger;
    this._loggable = new Lgr.ApgLgrLoggable('ApgCiiValidatorsService', this._logger);
    this._loggable.logBegin(this.Init.name);

    r = this.#getValidators(this._loggable, this._logger);
    if (r.ok) {
      this._initialized = true;
    }

    this._loggable.logEnd(r);
    return r;
  }


  static #getValidators(aloggable: Lgr.ApgLgrLoggable, alogger: Lgr.ApgLgr) {

    aloggable.logBegin(this.#getValidators.name);
    let r: Rst.IApgRst = { ok: true };

    // TODO @6 Seems to me that using this pattern the Ajv is used to create
    // singular indipendent functions that contain every detail of every referenced
    // dependency. This seems not very efficient, and maybe is the reason why the
    // warmup time is so long. -- APG 20230405
    const validatorService = new Jsv.ApgJsvService(alogger);

    for (const element of ApgCiiValidators) {

      const deps = element.dependencies ? element.dependencies : [];
      r = validatorService.addValidator(element.jsonSchema, deps);

      if (!r.ok) break;

      r = Rst.ApgRst.CheckPayload(r, 'ApgJsvAjvValidator') as Rst.IApgRst;

      if (!r.ok ) break;
      const validator = r.payload!.data as unknown as Jsv.ApgJsvAjvValidator;
      this._validators.set(element.type, validator);

    }

    if (r.ok) { 
      r.payload = undefined;
    }

    aloggable.logEnd(r);
    return r;
  }


  static #validateInstructionsWithAjv(instructions: IApgCiiInstruction[]) {

    let r: Rst.IApgRst = { ok: true };

    const genVal = this._validators.get(eApgCiiInstructionTypes.INSTRUCTION);

    if (!genVal) {
      r = Rst.ApgRstErrors.Parametrized(
        "Validator [%1] Not found", [eApgCiiInstructionTypes.INSTRUCTION]
      );
    }
    else {
      for (const instruction of instructions) {

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
      }
    }

    return r;
  }




}
