from django.db import models

# Create your models here.

# The User is the same entity of the Authenticated User #
class RegisterUser(models.Model):
    # registerid: a unique value for the register process per user
    register_id = models.IntegerField(primary_key=True, db_column='RegisterID')
    # subject: The actualy question body #
    username = models.CharField(db_column='username')
    # (optional) an additional indicator, upto the other module design #
    register_completed = models.BooleanField(db_column='IsRegisterCompleted', default=False)
    # bible_name: the value to be populated back at the end of the Register process #
    bible_name = models.CharField(max_length=100, db_column='BibleName', null=True)
    cn_bible_name = models.CharField(max_length=100, db_column='CNBibleName', null=True)
    class Meta:
        db_table = 'RegisterUser'

# The Register:Question is the entity of each individual question to be answered by the applicant #
class RegisterQuestion(models.Model):
    # qid: The identity of each question #
    question_id = models.IntegerField(primary_key=True, editable=False, db_column='QuestionID')
    # subject: The actualy question body #
    subject = models.CharField(db_column='Subject')
    # description: The detailed explaination of the question #
    description = models.CharField(db_column='Description', null=True)
    # min_length: The minimum required length of the answer of this question #
    min_length = models.IntegerField(db_column='MinLength', null=True)
    # required: Whether the question is required to be answered (answer is not empty) #
    answer_required = models.BooleanField(default=False, db_column='IsAnswerRequired')
    # answer_type: the data type expected of the answer, e.g. Integer, Boolean, Chars #
    # answer_type: this field might be extend to an AnswerType entity #
    answer_type = models.CharField(db_column='AnswerType', null=True)
    class Meta:
        db_table = 'RegisterQuestion'

# The Register:Question is the entity of each individual question to be answered by the applicant #
class RegisterQuestionOption(models.Model):
    question_option_id = models.IntegerField(primary_key=True, editable=False, db_column='QuestionOptionID')
    question_id = models.ForeignKey('RegisterQuestion', on_delete=models.PROTECT, db_column='QuestionID', related_name="question_options")
    # subject: The actualy question body #
    subject = models.CharField(db_column='Subject')
    # description: The detailed explaination of the question #
    description = models.CharField(db_column='Description', null=True)
    # min_length: The minimum required length of the answer of this question #
    option_seq = models.IntegerField(db_column='OptionSequence')
    # required: Whether the question is required to be answered (answer is not empty) #
    allow_input = models.BooleanField(default=False, db_column='IsAllowAddtionalInput')
    class Meta:
        db_table = 'RegisterQuestionOption'

# The RegisterStep the entity of each phase of the registration, composing by a list of questions  #
class RegisterStep(models.Model):
    # sid: The identity of each step #
    step_id = models.IntegerField(primary_key=True, editable=False, db_column='StepID')
    # step_seq: The sequence of the step in the registration process #
    step_seq = models.IntegerField(db_column='StepSequence')
    # subject: The summary of the step #
    subject = models.CharField(db_column='Subject')
    # description: The detailed explaination of the step #
    description = models.CharField(db_column='Description', null=True)
    # approval_required: Whether this step requires the super users' approval #
    approval_required = models.BooleanField(default=False, db_column='IsApprovalRequired')
    class Meta:
        db_table = 'RegisterStep'

# The RegisterStepQuestion is the relationship linking RegisterStep and RegisterQuestion #
class RegisterStepQuestion(models.Model):
    step_question_id = models.IntegerField(primary_key=True, editable=False, db_column='StepQuestionID')
    # sid: The identity of the step #
    step_id = models.ForeignKey('RegisterStep', on_delete=models.PROTECT, db_column='StepID')
    # qid: The identity of the question #
    question_id = models.ForeignKey('RegisterQuestion', on_delete=models.PROTECT, db_column='QuestionID')
    # question_seq: The sequence of the question in the step #
    question_seq = models.IntegerField(db_column='QuestionSequence')
    class Meta:
        db_table = 'RegisterStepQuestion'

# The RegisterAnswer is the entity of the answer to each question #
class RegisterAnswer(models.Model):
    answer_id = models.IntegerField(primary_key=True, editable=False, db_column='AnswerID')
    # FK_registerid: the unique identifier for each user #
    register_id = models.ForeignKey('RegisterUser', on_delete=models.PROTECT, db_column='RegisterID')
     # FK_qid: The identity of the question #
    question_id = models.ForeignKey('RegisterQuestion', on_delete=models.PROTECT, db_column='QuestionID')
    # content: the primary answer to the question #
    content = models.CharField(db_column='Content', null=True)
    # addtional_input: the addtional input answer to the question #
    addtional_input = models.CharField(db_column='AddtionalInput', null=True)
    class Meta:
        db_table = 'RegisterAnswer'

# The RegisterStepAnswer is the entity of the step complete per condition #
class RegisterUserStep(models.Model):
    user_step_id = models.IntegerField(primary_key=True, editable=False, db_column='UserStepID')
    # FK_registerid: the unique identifier for each user #
    register_id = models.ForeignKey('RegisterUser', on_delete=models.PROTECT, db_column='RegisterID')
    # FK-sid: The identity of the step #
    step_id = models.ForeignKey('RegisterStep', on_delete=models.PROTECT, db_column='StepID')
    # submitted: the questions are submitted #
    submitted = models.BooleanField(db_column='IsSubmitted', default=False)
    # submitted_time: the timestamp of the step submitted #
    submitted_time = models.DateTimeField(db_column='SubmittedTime', null=True)
    # completed: the questions are meeting the requirements #
    completed = models.BooleanField(db_column='IsCompleted', default=False)
    # approved: the step is approved by a super user #
    approved = models.BooleanField(db_column='IsApproved', default=False)
    # FK_Email: the identity of the super user who approve the step
    approved_by = models.CharField(db_column='ApprovedBy', null=True)
    # approved_time: the timestamp of the approved time #
    approved_time = models.DateTimeField(db_column='ApprovedTime', null=True)
    class Meta:
        db_table = 'RegisterUserStep'    
    
'''
class RegisterUser(models.Model):
    # email: The identity of the user #
    email = models.CharField(max_length=200, primary_key=True, editable=False, db_column='Email')
    # registerid: a unique value for the register process per user
    register_id = models.IntegerField(db_column='RegisterID')
    # (optional) an additional indicator, upto the other module design #
    register_completed = models.BooleanField(db_column='IsRegisterCompleted', default=False)
    # bible_name: the value to be populated back at the end of the Register process #
    bible_name = models.CharField(max_length=100, db_column='BibleName', null=True)
    class Meta:
        #db_table = 'RegisterUser'
        indexes = [
            models.Index(fields=['email']),  # Single-field index
        ]


'''