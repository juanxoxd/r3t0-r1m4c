import { User } from '../../domain/repository/user.repository';

// export class UserMapper {
//   static toDomain(input: any): User {
//     return {
//       id: input.id.S,
//       NroDocumento: input.NroDocumento.S,
//       FirstName: input.Nombres.S,
//       LastNames: input.Apellidos.S,
//       DocumentType: input.TipoDocumento.S,
//       Email: input.Email.S,
//       UserName: input.UserName.S,
//       Sub: input.Sub.S,
//       PhoneNumber: input.PhoneNumber.S,
//       Role: input.Role.S
//     };
//   }
// }


export class UserMapper {
  static toDomain(input: any): User {
    return {
      NroDocumento: input.NroDocumento?.S,
      id: input.id?.S,
      Names: input.Names?.S || '',
      LastNames: input.LastNames?.S || '',
      DocumentType: input.DocumentType?.S || '',
      Email: input.Email?.S || '',
      Sub: input.Sub?.S || '',
      PhoneNumber: input.PhoneNumber?.S || '',
      Role: input.Role?.S || '',
      Status: input.Status?.S || '',
    };
  }
}
