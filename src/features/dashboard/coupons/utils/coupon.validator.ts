import Joi from 'joi';
import { CouponDiscountType } from './coupon.enum';

export const createCouponValidator = Joi.object({
  code: Joi.string().min(3).max(32).required().messages({
    'string.min': 'Code must be at least 3 characters',
    'string.max': 'Code must be at most 32 characters',
    'any.required': 'Coupon code is required',
    'string.empty': 'Coupon code is required',
  }),
  discount_type: Joi.string()
    .valid(...Object.values(CouponDiscountType))
    .required()
    .messages({ 'any.required': 'Discount type is required' }),
  discount_value: Joi.number().positive().required().messages({
    'number.base': 'Discount value must be a number',
    'number.positive': 'Discount value must be positive',
    'any.required': 'Discount value is required',
  }),
  min_order_price: Joi.number().min(0).optional().allow(null, ''),
  max_uses: Joi.number().integer().positive().optional().allow(null, ''),
  expires_at: Joi.date().greater('now').optional().allow(null, '').messages({
    'date.greater': 'Expiry date must be in the future',
  }),
});

export const updateCouponValidator = Joi.object({
  discount_type: Joi.string().valid(...Object.values(CouponDiscountType)).optional(),
  discount_value: Joi.number().positive().optional().messages({
    'number.positive': 'Discount value must be positive',
  }),
  min_order_price: Joi.number().min(0).optional().allow(null, ''),
  max_uses: Joi.number().integer().positive().optional().allow(null, ''),
  expires_at: Joi.date().greater('now').optional().allow(null, '').messages({
    'date.greater': 'Expiry date must be in the future',
  }),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').optional(),
});
