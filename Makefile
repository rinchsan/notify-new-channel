.PHONY: test
test:
	@deno test --allow-net --coverage=cover
	@deno coverage cover/
	@rm -rf cover/
