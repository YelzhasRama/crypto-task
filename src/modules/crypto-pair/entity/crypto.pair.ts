import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseCurrency } from '../../../common/constants/base.currency';
import { QuoteCurrency } from '../../../common/constants/quote.currency';

@Entity()
export class CryptoPair {
  @PrimaryGeneratedColumn()
  @Column()
  id: number;

  @Column({
    type: 'enum',
    enum: BaseCurrency,
  })
  baseCurrency: BaseCurrency;

  @Column({
    type: 'enum',
    enum: QuoteCurrency,
  })
  quoteCurrency: QuoteCurrency;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 60 })
  updateInterval: number;
}
