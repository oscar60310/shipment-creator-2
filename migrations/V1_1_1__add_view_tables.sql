CREATE VIEW order_tem_detail AS SELECT 
 	oi.id AS "id",
	o.id AS "orderId",
	o."orderNumber" AS "orderNumber",
	o."orderTime" AS "orderTime",
	o."customerId" AS "customerId",
	p."name" AS "productName",
	p.id AS "productId",
	p.unit AS "unit",
	oi.price AS "price",
	oi.quantity AS "quantity",
	(oi.price * oi.quantity) AS "subTotal"
FROM order_items oi
INNER JOIN products p ON p.id = oi."productId"
INNER JOIN orders o ON o.id = oi."orderId"
WHERE o.status = 'CONFIRM' AND o."enable" = true;