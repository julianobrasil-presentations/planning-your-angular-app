# Planejando sua aplicação angular para crescer

### Dados de Usuários

Os dados de foram gerados em https://next.json-generator.com 
com o script:

```js
[
  {
    'repeat(10, 20)': {
      id: '{{integer(1, 400000)}}',
      name: '{{firstName()}} {{surname()}}',
      email() {
        const names = this.name.split(' ');
        return `${names[0]}.${names[1]}@email.com`.toLowerCase();
      },
      photo: ''
    }
  }
]
```

