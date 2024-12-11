import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CryptoPair } from '../../crypto-pair/entity/crypto.pair';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class CryptoRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CryptoPair)
  @JoinColumn()
  pair: CryptoPair;

  @Column('decimal')
  rate: number;

  @Column()
  timestamp: Date;
}
