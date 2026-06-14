export class ClasesErrores extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        this.name = this.constructor.name;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}


export class ClassNotFound extends ClasesErrores {
    constructor() {
        super("La clase no fue encontrada.", 404);
    }
}

export class CodeInvalid extends ClasesErrores {
    constructor(code: string = "code") {
        super(`El código: ${code} el es invalido.`, 400);
    }
}

export class UserAlreadyMember extends ClasesErrores {
    public readonly idClase: string | number;
    
    constructor(idClase: string | number) {        
        super("El usuario ya es miembro.", 404);
        
        this.idClase = idClase;
    }
}


export class UserUnauthorized extends ClasesErrores {
    constructor() {
        super("El usuario no esta autorizado", 403);
    }
}
