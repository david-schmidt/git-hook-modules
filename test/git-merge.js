describe("When GHM is in use,", function(){
	describe("git merge", function(){
		beforeEach(function(done){
			TEST_SUITE.setup(true, true, true, function(err){
				if(err){
					done(err);
				}
				else{
					TEST_SUITE.git.__makeAddAndCommitFile("master", "master", function(err){
						if(err){
							done(err);
						}
						else{
							TEST_SUITE.git.__setupBranch("other", function(err){
								if(err){
									done(err);
								}
								else{
									TEST_SUITE.git.checkout("master", done);
								}
							});
						}
					});
				}
			});
		});

		describe("should run hooks when", function(){

			it("merging in exhisting branch", function(done){
				TEST_SUITE.git.merge("other", function(err, stdout, stderr){
					if(err){
						done(err);
					}
					else{
						try{
							stderr.should.equal("post-merge\n\n");
							done();
						}
						catch(err){
							done(err);
						}
					}
				});
			});
		});
	});
});