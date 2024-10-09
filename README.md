# Modelado con mongoose

## Contexto:

Un comercio de suministros de limpieza requiere que cada uno de sus empleados pueda
registrar sus ventas de forma individual. Además, los empleados deben tener acceso a la
aplicación utilizando credenciales.

## Abordando la problematica:

Dentro del contexto logramos identificar la necesidad de guardar los datos tanto de
empleados, como de las ventas. También inferimos que se requiere una colección
para guardar los productos de dicho comercio. Se tomó la decisión de auntenticar
al usuario, requiriendo su correo, una contraseña, y su huella digital.

### Tipos de relaciones:

1. Colección empleados:

- Dentro de esta colección, guardamos los datos de las credenciales como un objeto,
  ya que la huella digital se requiere en una segunda instacia para el registro.
- La huella digital se referencia, ya que la lógica empleada para guardar los datos
  no resulta coherente dentro de la colleción de empleados.

```javascript
new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  credentials: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fingerprint: {
      type: Squema.Types.ObjectId,
      ref: "Fingerprints",
      required: true,
    },
  },
  birthdate: { type: Date, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
});
```

2. Colección huellas:

- Ya que no es recomendable guardar la huella digital como una imagen, se solicita
  un hash de la contraseña. Además de ser importante para la integridad de la información.
- También se solicita el tipo de algoritmo utilizado para la codificación de la huella.

```javascript
new Schema({
  hash: {
    type: String,
    required: true,
  },
  algorithm: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

3. Colección ventas:

- En esta colección referenciamos al empleado, para facilitar la busqueda
  de las ventas por empleado.
- Dentro de descripción, nuevamente optamos por un documento embebido de tipo
  array. Ya que puede contener varios productos.
- Cada producto se referencia de dicha colección, para un mejor control
  de estos, por unidad.

```javascript
new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employees",
    required: true,
  },
  description: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
});
```

4. Colección productos:

- Finalmente realizamos una colección de productos, con el fin
  de mantener un control individual y especifico.

```javascript
new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: false },
});
```
