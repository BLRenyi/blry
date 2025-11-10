from rest_framework import serializers
from .models import RegisterUser
from .models import RegisterQuestion, RegisterQuestionOption,RegisterStep, RegisterStepQuestion
from .models import RegisterAnswer, RegisterUserStep

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterUser
        fields = '__all__'
class RegisterQuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterQuestionOption
        fields = ('__all__')
class RegisterQuestionSerializer(serializers.ModelSerializer):
    question_options = RegisterQuestionOptionSerializer(many=True, read_only=True)
    class Meta:
        #ui_step_seq = serializers.SerializerMethodField()
        model = RegisterQuestion
        fields = ('__all__')
        #def get_ui_step_seq(self, obj):
            #return f"Custom value for {obj.name}"
class RegisterStepQuestionSerializer(serializers.ModelSerializer):
    #step_subject = serializers.ReadOnlyField(source='step_id.subject')
    #step_description = serializers.ReadOnlyField(source='step_id.description')
    #step_approval_required = serializers.ReadOnlyField(source='step_id.approval_required')
    question_subject = serializers.ReadOnlyField(source='question_id.subject')
    question_description = serializers.ReadOnlyField(source='question_id.description') 
    question_min_length = serializers.ReadOnlyField(source='question_id.min_length') 
    question_answer_required = serializers.ReadOnlyField(source='question_id.answer_required') 
    question_answer_type = serializers.ReadOnlyField(source='question_id.answer_type') 
    #question_options = RegisterQuestionOptionSerializer(source='question_id.question_options') 
    class Meta:
        model = RegisterStepQuestion
        fields = ('__all__')
class RegisterStepSerializer(serializers.ModelSerializer):
    step_questions = RegisterStepQuestionSerializer(many=True, read_only=True)
    class Meta:
        model = RegisterStep
        fields = ('__all__')
class RegisterAnswerSerializer(serializers.ModelSerializer):
    question_subject = serializers.ReadOnlyField(source='question_id.subject')
    question_description = serializers.ReadOnlyField(source='question_id.description') 
    question_min_length = serializers.ReadOnlyField(source='question_id.min_length') 
    question_answer_required = serializers.ReadOnlyField(source='question_id.answer_required') 
    question_answer_type = serializers.ReadOnlyField(source='question_id.answer_type') 
    class Meta:
        model = RegisterAnswer
        fields = ('__all__', 'question')
class RegisterUserStepSerializer(serializers.ModelSerializer):
    step_seq = serializers.ReadOnlyField(source='step_id.step_seq')
    step_subject = serializers.ReadOnlyField(source='step_id.subject')
    step_description = serializers.ReadOnlyField(source='step_id.description') 
    step_approval_required = serializers.ReadOnlyField(source='step_id.approval_required')
    username = serializers.ReadOnlyField(source='register_id.username')
    update_err = serializers.CharField(required=False)
    class Meta:
        model = RegisterUserStep
        fields = ('__all__')
class RegisterUserAnswerDisplaySerializer(serializers.Serializer):
    step_question = RegisterStepQuestionSerializer(required=True)
    question_options = RegisterQuestionOptionSerializer(required=False, many=True)
    answer_id = serializers.IntegerField(required=False)
    answer_content = serializers.CharField(required=False)
    answer_addtional_input = serializers.CharField(required=False)
class RegisterUserStepDisplaySerializer(serializers.Serializer):
    '''user = RegisterUserSerializer(required=False)'''
    user_step = RegisterUserStepSerializer(required=False)
    '''step = RegisterStepSerializer(required=False)'''
    answers = RegisterUserAnswerDisplaySerializer(many=True)

'''
class RegisterAnswerDisplay:
    def __init__(self, 
    answer_id, register_id, question_id, 
    question_subject, question_description, question_min_length, question_answer_required, question_answer_type,
    content=None, addtional_input=None):
        self.answer_id = answer_id
        self.register_id = register_id
        self.question_id = question_id
        self.content = content
        self.addtional_input = addtional_input
        self.question_subject = question_subject
        self.question_description = question_description
        self.question_min_length = question_min_length
        self.question_answer_required = question_answer_required
        self.question_answer_type = question_answer_type
class RegisterAnswerDisplaySerializer(serializers.Serializer):
    answer_id = serializers.IntegerField()
    register_id = serializers.IntegerField()
    question_id = serializers.IntegerField()
    content = serializers.CharField(null=True)
    addtional_input = serializers.CharField(null=True)
    question_subject = serializers.CharField()
    question_description = serializers.CharField(null=True) 
    question_min_length = serializers.IntegerField(null=True) 
    question_answer_required = serializers.ReadOnlyField() 
    question_answer_type = serializers.ReadOnlyField(null=True) 
    def create(self, validated_data):
        return RegisterAnswerDisplay(**validated_data)
    def update(self, instance, validated_data):
        instance.answer_id = validated_data.get('answer_id', instance.answer_id)
        instance.register_id = validated_data.get('register_id', instance.register_id)
        instance.question_id = validated_data.get('question_id', instance.question_id)
        instance.content = validated_data.get('content', instance.content)
        instance.addtional_input = validated_data.get('addtional_input', instance.addtional_input)
        instance.question_subject = validated_data.get('question_subject', instance.question_subject)
        instance.question_description = validated_data.get('question_description', instance.question_description)
        instance.question_min_length = validated_data.get('question_min_length', instance.question_min_length)
        instance.question_answer_required = validated_data.get('question_answer_required', instance.question_answer_required)
        instance.question_answer_type = validated_data.get('question_answer_type', instance.question_answer_type)
        return instance 
'''