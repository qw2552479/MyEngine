/**
 *  -
 *
 * create by wjl at
 *
 */

namespace QE {
    /**
     * 序列化属性
     * @param {string|Function} fieldType
     */
    export function SerializeField<T extends Component>(fieldType: 'number' | 'string' | 'function' | 'object' | 'array' | (new() => T)) {
        return function (target, name, descriptor) {
            // console.log(`SerializeField field ${name}`);
            if (__QE_EDITOR_MODE__) {
                let serializedFieldMap = target.constructor.__QE_SerializedFieldMap;
                if (!serializedFieldMap) {
                    serializedFieldMap = {};
                    target.constructor.__QE_SerializedFieldMap = serializedFieldMap;
                }

                serializedFieldMap[name] = fieldType;
            }

            return descriptor;
        };
    }

    export class Serializer {

    }
}
