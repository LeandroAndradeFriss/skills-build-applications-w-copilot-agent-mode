from django.db import models
from djongo import models as djongo_models

# User model
class User(models.Model):
    id = djongo_models.ObjectIdField(primary_key=True, editable=False, db_column='_id')
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    def __str__(self):
        return self.name

# Team model
class Team(models.Model):
    id = djongo_models.ObjectIdField(primary_key=True, editable=False, db_column='_id')
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.name

# Activity model
class Activity(models.Model):
    id = djongo_models.ObjectIdField(primary_key=True, editable=False, db_column='_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes
    date = models.DateField()
    def __str__(self):
        return f"{self.user.name} - {self.type}"

# Workout model
class Workout(models.Model):
    id = djongo_models.ObjectIdField(primary_key=True, editable=False, db_column='_id')
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=20)
    def __str__(self):
        return self.name

# Leaderboard model
class Leaderboard(models.Model):
    id = djongo_models.ObjectIdField(primary_key=True, editable=False, db_column='_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    def __str__(self):
        return f"{self.user.name} - {self.points}"
