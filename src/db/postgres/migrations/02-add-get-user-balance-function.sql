CREATE OR REPLACE FUNCTION get_user_balance(uid UUID)
RETURNS TABLE (
	earnings NUMERIC(10,2),
	expenses NUMERIC(10,2),
	investments NUMERIC(10,2),
	balance NUMERIC(10,2)
) AS $$
BEGIN
		RETURN QUERY
			select 
				sum(case when type = 'EARNING' then amount else 0 end) as ganhos,
				sum(case when type = 'INVESTMENT' then amount else 0 end) as investimentos,  
				sum(case when type = 'EXPENSE' then amount else 0 end) as gastos,
				(
				 sum(case when type = 'EARNING' then amount else 0 end) + 
				 sum(case when type = 'INVESTMENT' then amount else 0 end) -   
				 sum(case when type = 'EXPENSE' then amount else 0 end)
				) as balance
			from transactions 
				where  user_id = get_user_balance.uid;	
END; $$
LANGUAGE plpgsql;