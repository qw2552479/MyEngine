namespace QuickEngine {

    export module Reflection {

        export class Type {

            private readonly _cls: Function;

            /**
             * 返回当前类型的上一层继承类型
             *@return {Function} 
             */
            public get baseType(): Function {
                let proto = this._cls.prototype;

                if (!proto) {
                    return undefined;
                }

                let parentProto = Object.getPrototypeOf(proto);

                if (parentProto) {
                    return parentProto.constructor;
                }

                return undefined;
            }

            constructor(cls: Function) {
                console.assert(!!cls, "类参数不能为空");
                this._cls = cls;
            }

            public static getType(instance: Object): Type {
                return new Type(instance.constructor);
            }

            public static typeOf(cls: Function): Type {
                return new Type(cls);
            }

            public isSubClassOf(superClass: Type): boolean {
                return superClass._cls.prototype.isPrototypeOf(this._cls);
            }

            public equal(type: Type): boolean {
                return this._cls == type._cls;
            }
        }

    }

}