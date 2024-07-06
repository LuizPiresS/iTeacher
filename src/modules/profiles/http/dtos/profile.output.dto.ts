import { ApiProperty } from '@nestjs/swagger';

class AddressOutputDTO {
  @ApiProperty({ example: 'Random Street Name' })
  street: string;

  @ApiProperty({ example: '123' })
  number: string;

  @ApiProperty({ example: 'Random Neighborhood Name' })
  neighborhood: string;
}

export class ProfileOutputDTO {
  @ApiProperty({ example: 'randomId' })
  id: string;

  @ApiProperty({ example: 'Random Name' })
  name: string;

  @ApiProperty({ example: '(99)999999999' })
  cellPhone: string;

  @ApiProperty({ type: AddressOutputDTO })
  address: AddressOutputDTO;
}
