from rest_framework import serializers
from registration.serializers import RegisterQuestionOptionSerializer, RegisterQuestionSerializer, RegisterStepSerializer, RegisterStepQuestionSerializer

class RegisterSysStepDetailSerializer(serializers.Serializer):
    sys_step = RegisterStepSerializer(required=False)
    step_questions = RegisterStepQuestionSerializer(many=True)
class RegisterSysQuestionDetailSerializer(serializers.Serializer):
    sys_question = RegisterQuestionSerializer(required=False)
    question_options = RegisterQuestionOptionSerializer(many=True)