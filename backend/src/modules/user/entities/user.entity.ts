import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar', 
    nullable: false,
  })
  username: string;

  @Column({ 
    type: 'varchar', 
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ 
    type: 'varchar', 
    nullable: false,
  })
  password: string;

  @Column({ 
    type: 'boolean',
    default: true 
  })
  isActive: boolean;

  @BeforeInsert()  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);  
  }
}
